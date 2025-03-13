// hooks/useChat.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { chatAxiosInstance } from "@/api/chat.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { useSocket } from "@/context/SocketContext";
import { vendorAxiosInstance } from "@/api/vendor.axios";

interface IMessageEntity {
  _id: string;
  chatRoomId: string;
  content: string;
  senderId: string;
  senderType: "Client" | "Vendor";
  read: boolean;
  createdAt: Date;
}

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  status?: "online" | "offline";
  chatRoomId: string;
}

export function useChat(userId: string, userType: "Client" | "Vendor") {
  const socket = useSocket();
  const [messages, setMessages] = useState<IMessageEntity[]>([]);
  const [contacts, setContacts] = useState<ChatContact[]>([]);

  useEffect(() => {
    if (!userId || !socket) return;

    socket.emit("join", { userId, userType });

    socket.on("message", (message: IMessageEntity) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev; 
        return [...prev, message];
      });
      updateContactLastMessage(message);
    });

    socket.on("chatHistory", (history: IMessageEntity[]) => {
      setMessages(history);
    });

    socket.on("userStatus", ({ userId: contactId, status }: { userId: string; status: "online" | "offline" }) => {
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, status } : contact
        )
      );
    });

    return () => {
      socket.off("message");
      socket.off("chatHistory");
      socket.off("userStatus");
    };
  }, [userId, userType, socket]);

  const fetchContacts = async () => {
    try {
      const response = await chatAxiosInstance.get(`/${userId}/${userType.toLowerCase()}`);
      const chatRooms = response.data;

      const transformedContacts: ChatContact[] = await Promise.all(
        chatRooms.map(async (room: any) => {
          if (userType === "Client") {
            const vendorResponse = await clientAxiosInstance.get(`/_cl/client/vendors/${room.vendorId}`);
            const vendor = vendorResponse.data;
            const lastMessage = messages.find((m) => m.chatRoomId === room._id) || {
              content: "",
              createdAt: room.createdAt,
            };
            return {
              id: room.vendorId,
              name: `${vendor.firstName} + " " + ${vendor.lastName}` || "Unknown Vendor",
              avatar: vendor.profileImage || "/placeholder.svg?height=48&width=48",
              lastMessage: lastMessage.content,
              lastMessageTime: new Date(lastMessage.createdAt),
              unreadCount: messages.filter(
                (m) => m.chatRoomId === room._id && m.senderType === "Vendor" && !m.read
              ).length,
              status: "offline",
              chatRoomId: room._id,
            };
          } else {
            // Vendor case
            const clientResponse = await vendorAxiosInstance.get(`/_ve/vendor/${room.clientId}`);
            const client = clientResponse.data;
            const lastMessage = messages.find((m) => m.chatRoomId === room._id) || {
              content: "",
              createdAt: room.createdAt,
            };
            return {
              id: room.clientId,
              name: client.name || "Unknown Client",
              avatar: client.avatar || "/placeholder.svg?height=48&width=48",
              lastMessage: lastMessage.content,
              lastMessageTime: new Date(lastMessage.createdAt),
              unreadCount: messages.filter(
                (m) => m.chatRoomId === room._id && m.senderType === "Client" && !m.read
              ).length,
              status: "offline",
              chatRoomId: room._id,
            };
          }
        })
      );
      setContacts(transformedContacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      toast.error("Failed to load contacts");
    }
  };

  const updateContactLastMessage = (message: IMessageEntity) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.chatRoomId === message.chatRoomId
          ? {
              ...contact,
              lastMessage: message.content,
              lastMessageTime: new Date(message.createdAt),
              unreadCount:
                message.senderType !== userType && !messages.some((m) => m._id === message._id && m.read)
                  ? (contact.unreadCount || 0) + 1
                  : contact.unreadCount,
            }
          : contact
      )
    );
  };

  const sendMessage = (chatRoomId: string, content: string, recipientId: string) => {
    if (!socket) return;
    const payload = {
      clientId: userType === "Client" ? userId : recipientId,
      vendorId: userType === "Vendor" ? userId : recipientId,
      senderId: userId,
      senderType: userType,
      content,
      chatRoomId,
    };
    socket.emit("sendMessage", payload);
    toast.success("Message sent successfully.");
  };

  const fetchChatHistory = (chatRoomId: string) => {
    if (socket) {
      socket.emit("getChatHistory", chatRoomId);
    }
  };

  return {
    socket,
    messages,
    contacts,
    fetchContacts,
    sendMessage,
    fetchChatHistory,
  };
}