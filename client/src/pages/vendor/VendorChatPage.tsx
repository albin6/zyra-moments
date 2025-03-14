import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/chat/ChatList";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useMobile } from "@/hooks/useMobile";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useChat } from "@/hooks/chat/useChat";

export function VendorChatPage() {
  const userId = useSelector<RootState>((state) => state.vendor?.vendor?.id) || "your-vendor-id";
  const userType = "Vendor";
  const { socket, messages, contacts, fetchContacts, sendMessage, fetchChatHistory } = useChat(userId as string, userType);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    if (userId && socket) {
      fetchContacts();
    }
  }, [userId, socket, fetchContacts]);

  useEffect(() => {
    if (selectedChatRoomId && socket) {
      fetchChatHistory(selectedChatRoomId);
    }
  }, [selectedChatRoomId, socket, fetchChatHistory]);

  const handleSendMessage = (message: string) => {
    if (!selectedChatRoomId) return;
    const selectedContact = contacts.find((c) => c.chatRoomId === selectedChatRoomId);
    if (!selectedContact) return;
    sendMessage(selectedChatRoomId, message, selectedContact.id);
  };

  const selectedContact = contacts.find((contact) => contact.chatRoomId === selectedChatRoomId);

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Client Conversations</h1>
      <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-6"}`}>
        <div className={isMobile && selectedChatRoomId ? "hidden" : ""}>
          <ChatList
            contacts={contacts}
            onSelectContact={(clientId) => {
              const contact = contacts.find((c) => c.id === clientId);
              setSelectedChatRoomId(contact?.chatRoomId || null);
            }}
            selectedContactId={selectedContact?.id}
            title="Your Clients"
            userType="Vendor"
          />
        </div>
        <div className={`${isMobile ? "col-span-1" : "col-span-2"} ${isMobile && !selectedChatRoomId ? "hidden" : ""}`}>
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
                messages={messages.filter((m) => m.chatRoomId === selectedChatRoomId)}
                onSendMessage={handleSendMessage}
                userType="Vendor"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/30 rounded-lg">
              <div className="text-center p-6">
                <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a client from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorChatPage;