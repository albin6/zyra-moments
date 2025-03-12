import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/chat/ChatList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useMobile } from "@/hooks/useMobile";
import { toast } from "sonner";

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

const SOCKET_URL = `${import.meta.env.VITE_CHAT_API_URI}`;

export function VendorChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(
    null
  );
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<IMessageEntity[]>([]);
  const isMobile = useMobile();

  const userId = "your-vendor-id"; // Replace with actual vendor ID from auth
  const userType = "Vendor";

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { withCredentials: true });
    setSocket(newSocket);

    newSocket.emit("join", { userId, userType });
    fetchContacts(newSocket);

    newSocket.on("message", (message: IMessageEntity) => {
      setMessages((prev) => {
        if (message.chatRoomId === selectedChatRoomId) {
          return [...prev, message];
        }
        return prev;
      });
      updateContactLastMessage(message);
    });

    newSocket.on("chatHistory", (history: IMessageEntity[]) => {
      setMessages(history);
    });

    newSocket.on("chatUpdate", (updatedMessages: IMessageEntity[]) => {
      setMessages(updatedMessages);
    });

    newSocket.on("userStatus", ({ userId: contactId, status }) => {
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, status } : contact
        )
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchContacts = async (socketInstance: Socket) => {
    try {
      const response = await fetch(
        `/api/v_1/chats/${userId}/${userType.toLowerCase()}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch chats");
      const chatRooms: {
        _id: string;
        clientId: string;
        vendorId: string;
        createdAt: Date;
      }[] = await response.json();

      const transformedContacts: ChatContact[] = await Promise.all(
        chatRooms.map(async (room) => {
          const clientResponse = await fetch(
            `/api/v_1/clients/${room.clientId}`,
            {
              credentials: "include",
            }
          );
          const client = await clientResponse.json();

          const lastMessage = messages.find(
            (m) => m.chatRoomId === room._id
          ) || {
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
              (m) =>
                m.chatRoomId === room._id &&
                m.senderType === "Client" &&
                !m.read
            ).length,
            status: "offline",
            chatRoomId: room._id,
          };
        })
      );
      setContacts(transformedContacts);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      toast.error("Failed to load client list");
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
                message.senderType === "Client" &&
                contact.chatRoomId !== selectedChatRoomId
                  ? (contact.unreadCount || 0) + 1
                  : contact.unreadCount,
            }
          : contact
      )
    );
  };

  useEffect(() => {
    if (selectedChatRoomId && socket) {
      socket.emit("getChatHistory", selectedChatRoomId);
    }
  }, [selectedChatRoomId, socket]);

  const handleSendMessage = (message: string) => {
    if (!socket || !selectedChatRoomId) return;

    const selectedContact = contacts.find(
      (c) => c.chatRoomId === selectedChatRoomId
    );
    if (!selectedContact) return;

    const payload = {
      clientId: selectedContact.id,
      vendorId: userId,
      senderId: userId,
      senderType: userType,
      content: message,
    };

    socket.emit("sendMessage", payload);
    toast.success("Your message has been sent successfully.");
  };

  const selectedContact = contacts.find(
    (contact) => contact.chatRoomId === selectedChatRoomId
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Client Conversations</h1>

      <div
        className={`grid ${
          isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-6"
        }`}
      >
        <div className={isMobile && selectedChatRoomId ? "hidden" : ""}>
          <ChatList
            contacts={contacts}
            onSelectContact={(clientId) => {
              const contact = contacts.find((c) => c.id === clientId);
              setSelectedChatRoomId(contact?.chatRoomId || null);
            }}
            selectedContactId={
              selectedChatRoomId
                ? contacts.find((c) => c.chatRoomId === selectedChatRoomId)?.id
                : undefined
            }
            title="Your Clients"
            userType="Vendor"
          />
        </div>

        <div
          className={`${isMobile ? "col-span-1" : "col-span-2"} ${
            isMobile && !selectedChatRoomId ? "hidden" : ""
          }`}
        >
          {selectedChatRoomId && selectedContact ? (
            <div className="relative">
              {isMobile && (
                <Button
                  variant="ghost"
                  className="absolute top-4 left-4 z-10"
                  onClick={() => setSelectedChatRoomId(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              <ChatInterface
                recipientName={selectedContact.name}
                recipientAvatar={selectedContact.avatar}
                messages={messages}
                onSendMessage={handleSendMessage}
                userType="Vendor"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg">
              <div className="text-center p-6">
                <h3 className="text-xl font-medium mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose a client from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorChatPage;
