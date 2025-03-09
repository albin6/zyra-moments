import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";
import { ChatList } from "@/components/chat/ChatList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mockClients = [
  {
    id: "c1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
    lastMessage: "Can we add more decorations to the package?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 3,
    status: "online" as const,
  },
  {
    id: "c2",
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=48&width=48",
    lastMessage: "What time will the setup begin?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 0,
    status: "offline" as const,
  },
  {
    id: "c3",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=48&width=48",
    lastMessage: "Thanks for the quick response!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unreadCount: 0,
    status: "online" as const,
  },
];

// Mock messages for demonstration
const mockMessages = [
  {
    id: "m1",
    content: "Hello! I'm interested in your services for my upcoming event.",
    sender: "client" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "m2",
    content:
      "Hi there! I'd be happy to help. What kind of event are you planning?",
    sender: "vendor" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30),
  },
  {
    id: "m3",
    content:
      "It's a corporate conference for about 100 people. We need full catering and venue decoration.",
    sender: "client" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: "m4",
    content:
      "We can definitely handle that. Our corporate package includes catering, decoration, and technical support. Would you like to see our brochure?",
    sender: "vendor" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 45),
  },
  {
    id: "m5",
    content:
      "Yes, please send it over. Also, what's your availability for the second week of next month?",
    sender: "client" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
];

export function VendorChatPage() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState(mockMessages);
  const isMobile = useMobile();

  const selectedContact = mockClients.find(
    (contact) => contact.id === selectedContactId
  );

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: `m${messages.length + 1}`,
      content: message,
      sender: "vendor" as const,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    toast.success("Your message has been sent successfully.");
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Client Conversations</h1>

      <div
        className={`grid ${
          isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-6"
        }`}
      >
        <div className={isMobile && selectedContactId ? "hidden" : ""}>
          <ChatList
            contacts={mockClients}
            onSelectContact={(id) => setSelectedContactId(id)}
            selectedContactId={selectedContactId || undefined}
            title="Your Clients"
            userType="vendor"
          />
        </div>

        <div
          className={`${isMobile ? "col-span-1" : "col-span-2"} ${
            isMobile && !selectedContactId ? "hidden" : ""
          }`}
        >
          {selectedContactId && selectedContact ? (
            <div className="relative">
              {isMobile && (
                <Button
                  variant="ghost"
                  className="absolute top-4 left-4 z-10"
                  onClick={() => setSelectedContactId(null)}
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
                userType="vendor"
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
