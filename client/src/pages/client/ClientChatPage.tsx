import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/chat/ChatList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useMobile } from "@/hooks/useMobile";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { chatAxiosInstance } from "@/api/chat.axios";
import { clientAxiosInstance } from "@/api/client.axios";

// Types aligned with backend entities
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
  id: string; // vendorId
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  status?: "online" | "offline";
  chatRoomId: string; // _id from IChatRoomEntity
}

const SOCKET_URL = `${import.meta.env.VITE_CHAT_API_URI}`;

export function ClientChatPage() {
  const userId = useSelector<RootState>((state) => state.client.client?.id);
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(
    null
  );
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<IMessageEntity[]>([]);
  const isMobile = useMobile();

  // const userId = "your-client-id"; // Replace with actual client ID from auth
  const userType = "Client"; // Capitalized to match backend

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { withCredentials: true } as any);
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

    newSocket.on(
      "userStatus",
      ({
        userId: contactId,
        status,
      }: {
        userId: string;
        status: "online" | "offline";
      }) => {
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === contactId ? { ...contact, status } : contact
          )
        );
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchContacts = async (socketInstance: typeof Socket) => {
    try {
      const response = await chatAxiosInstance.get(
        `/${userId}/${userType.toLowerCase()}`
      );
      const chatRooms: {
        _id: string;
        clientId: string;
        vendorId: string;
        createdAt: Date;
      }[] = response.data;

      const transformedContacts: ChatContact[] = await Promise.all(
        chatRooms.map(async (room) => {
          const vendorResponse = await clientAxiosInstance.get(
            `/client/vendors/${room.vendorId}`
          );
          const vendor = vendorResponse.data;

          // Fetch last message for this chat room (optional optimization)
          const lastMessage = messages.find(
            (m) => m.chatRoomId === room._id
          ) || {
            content: "",
            createdAt: room.createdAt,
          };

          return {
            id: room.vendorId,
            name: vendor.firstName + " " + vendor.lastName || "Unknown Vendor",
            avatar:
              vendor.profileImage || "/placeholder.svg?height=48&width=48",
            lastMessage: lastMessage.content,
            lastMessageTime: new Date(lastMessage.createdAt),
            unreadCount: messages.filter(
              (m) =>
                m.chatRoomId === room._id &&
                m.senderType === "Vendor" &&
                !m.read
            ).length,
            status: "offline", // Updated via socket
            chatRoomId: room._id,
          };
        })
      );
      setContacts(transformedContacts);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
      toast.error("Failed to load vendor list");
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
                message.senderType === "Vendor" &&
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
      clientId: userId,
      vendorId: selectedContact.id,
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
      <h1 className="text-2xl font-bold mb-6">Your Vendor Conversations</h1>

      <div
        className={`grid ${
          isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-6"
        }`}
      >
        <div className={isMobile && selectedChatRoomId ? "hidden" : ""}>
          <ChatList
            contacts={contacts}
            onSelectContact={(vendorId) => {
              const contact = contacts.find((c) => c.id === vendorId);
              setSelectedChatRoomId(contact?.chatRoomId || null);
            }}
            selectedContactId={
              selectedChatRoomId
                ? contacts.find((c) => c.chatRoomId === selectedChatRoomId)?.id
                : undefined
            }
            title="Your Vendors"
            userType="Client"
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
                userType="Client"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg">
              <div className="text-center p-6">
                <h3 className="text-xl font-medium mb-2">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose a vendor from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientChatPage;
