import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  _id: string;
  chatRoomId: string;
  content: string;
  senderId: string;
  senderType: "Client" | "Vendor"; // Updated
  read: boolean;
  createdAt: Date;
}

interface ChatInterfaceProps {
  recipientName: string;
  recipientAvatar?: string;
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  className?: string;
  userType: "Client" | "Vendor"; // Updated
}

export function ChatInterface({
  recipientName = "John Doe",
  recipientAvatar = "/placeholder.svg?height=40&width=40",
  messages = [],
  onSendMessage,
  className,
  userType = "Client",
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={cn("flex flex-col h-[600px] w-full", className)}>
      {/* Chat header */}
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <img
            src={recipientAvatar || "/placeholder.svg"}
            alt={recipientName}
            className="object-cover"
          />
        </Avatar>
        <div>
          <h3 className="font-medium">{recipientName}</h3>
          <p className="text-sm text-muted-foreground">
            {userType === "Client" ? "Vendor" : "Client"}
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id} // Changed from id to _id
              className={cn(
                "flex",
                message.senderType === userType
                  ? "justify-end"
                  : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.senderType === userType
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="break-words">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 flex-shrink-0"
            type="button"
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[80px] resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full h-10 w-10 flex-shrink-0 p-0"
            type="button"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
