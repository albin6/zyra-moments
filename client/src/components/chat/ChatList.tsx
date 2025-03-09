import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  status?: "online" | "offline";
}

interface ChatListProps {
  contacts?: ChatContact[];
  onSelectContact?: (contactId: string) => void;
  selectedContactId?: string;
  className?: string;
  title?: string;
  userType: "client" | "vendor";
}

export function ChatList({
  contacts = [],
  onSelectContact,
  selectedContactId,
  className,
  title = "Messages",
  userType = "client",
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={cn("flex flex-col h-[600px] w-full max-w-md", className)}>
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${
              userType === "client" ? "vendors" : "clients"
            }...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full p-4">
            <p className="text-muted-foreground text-center">
              {searchQuery
                ? "No contacts found matching your search."
                : `No ${
                    userType === "client" ? "vendors" : "clients"
                  } to display.`}
            </p>
          </div>
        ) : (
          <ul className="divide-y">
            {filteredContacts.map((contact) => (
              <li key={contact.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-3 h-auto",
                    selectedContactId === contact.id && "bg-accent"
                  )}
                  onClick={() => onSelectContact?.(contact.id)}
                >
                  <div className="flex items-center w-full">
                    <div className="relative">
                      <Avatar className="h-12 w-12 mr-3">
                        <img
                          src={
                            contact.avatar ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt={contact.name}
                          className="object-cover"
                        />
                      </Avatar>
                      {contact.status === "online" && (
                        <span className="absolute bottom-0 right-3 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        {contact.lastMessageTime && (
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            {new Date(
                              contact.lastMessageTime
                            ).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      {contact.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                      )}
                    </div>
                    {contact.unreadCount && contact.unreadCount > 0 && (
                      <Badge className="ml-2 flex-shrink-0">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
