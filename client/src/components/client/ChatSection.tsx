import { ArrowLeft } from "lucide-react";
import { ChatButton } from "../chat/ChatButton";
import { ChatInterface } from "../chat/ChatInterface";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ChatSectionProps {
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendMessage: (message: string) => void;
  vendor: { name: string; avatar: string };
}

function ChatSection({
  showChat,
  setShowChat,
  handleSendMessage,
  vendor,
}: ChatSectionProps) {
  return (
    <div className={`md:col-span-1 ${showChat ? "block" : "hidden md:block"}`}>
      <div className="sticky top-6">
        {showChat ? (
          <div className="md:hidden mb-4">
            <Button variant="ghost" onClick={() => setShowChat(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to profile
            </Button>
          </div>
        ) : null}

        {showChat ? (
          <ChatInterface
            recipientName={vendor.name}
            recipientAvatar={vendor.avatar}
            onSendMessage={handleSendMessage}
            userType="Client"
            messages={[]}
          />
        ) : (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Chat with this vendor to discuss your event requirements.
            </p>
            <ChatButton
              onClick={() => setShowChat(true)}
              className="w-full"
              showTooltip={false}
            />
          </Card>
        )}
      </div>
    </div>
  );
}

export default ChatSection;
