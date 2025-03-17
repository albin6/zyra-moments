import { useEffect, useCallback } from "react";
import { useSocket } from "@/context/SocketContext";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  addMessage,
  setContacts,
  setMessages,
  updateContactStatus,
} from "@/store/slices/chatSlice";

export interface Contact {
  id: string;
  chatRoomId: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  status?: "online" | "offline";
}

interface Message {
  _id: string;
  chatRoomId: string;
  content: string;
  senderId: string;
  senderType: "Client" | "Vendor";
  read: boolean;
  createdAt: Date;
}

export function useChat(userId: string, userType: "Client" | "Vendor") {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !userId) return;

    socket.emit("join", { userId, userType });

    socket.on("connect_error", () => {
      toast.error("Failed to connect to chat server");
    });

    socket.on("message", (message: Message) => {
      dispatch(addMessage(message));
    });

    socket.on(
      "userStatus",
      ({
        userId: contactId,
        status,
      }: {
        userId: string;
        status: "online" | "offline";
      }) => {
        dispatch(updateContactStatus({ contactId, status }));
      }
    );

    socket.on(
      "typing",
      ({ chatRoomId, senderId }: { chatRoomId: string; senderId: string }) => {
        // Dispatch typing indicator if needed
        console.log(chatRoomId, senderId)
      }
    );

    return () => {
      socket.off("connect_error");
      socket.off("message");
      socket.off("userStatus");
      socket.off("typing");
    };
  }, [socket, userId, userType, dispatch]);

  const fetchContacts = useCallback(() => {
    if (!socket) return;
    socket.emit("getUserChats", { userId, userType });
    socket.once("userChats", (chatRooms: any[]) => {
      console.log("Fetched contacts:", chatRooms);
      const mappedContacts = chatRooms.map((room) => ({
        id: room.recipientId,
        chatRoomId: room.chatRoomId,
        name: room.recipientName,
        avatar: room.recipientAvatar,
        lastMessage: room.lastMessage,
        lastMessageTime: room.lastMessageTime
          ? new Date(room.lastMessageTime)
          : undefined,
        unreadCount: room.unreadCount,
        status: room.recipientStatus,
      }));
      dispatch(setContacts(mappedContacts));
    });
  }, [socket, userId, userType, dispatch]);

  const fetchChatHistory = useCallback(
    (chatRoomId: string) => {
      if (!socket) return;
      socket.emit("getChatHistory", chatRoomId);
      socket.once("chatHistory", (history: Message[]) => {
        dispatch(setMessages({ chatRoomId, messages: history }));
      });
    },
    [socket, dispatch]
  );

  const sendMessage = useCallback(
    (chatRoomId: string, content: string, recipientId: string) => {
      if (!socket) return;
      socket.emit("sendMessage", {
        clientId: userType === "Client" ? userId : recipientId,
        vendorId: userType === "Vendor" ? userId : recipientId,
        senderId: userId,
        senderType: userType,
        content,
        chatRoomId,
      });
    },
    [socket, userId, userType]
  );

  const sendTyping = useCallback(
    (chatRoomId: string) => {
      if (!socket) return;
      socket.emit("typing", { chatRoomId, senderId: userId });
    },
    [socket, userId]
  );

  return { socket, fetchContacts, sendMessage, fetchChatHistory, sendTyping };
}
