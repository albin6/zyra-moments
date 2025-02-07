import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Menu } from "lucide-react";
import { ClientSidebar } from "./ClientSidebar";
import { ProfileInfo } from "./ProfileInfo";
import { EditProfileForm } from "./EditProfileForm";
import { UserEvents } from "./UserEvents";
import { UserStats } from "./UserStats";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-background">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block w-64 shrink-0">
          <ClientSidebar
            firstName="John"
            lastName="Doe"
            avatarUrl="/placeholder.svg?height=48&width=48"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Sidebar for smaller screens */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden mb-4">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ClientSidebar
              firstName="John"
              lastName="Doe"
              avatarUrl="/placeholder.svg?height=48&width=48"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeTab === "profile"
                  ? "Profile"
                  : activeTab === "events"
                  ? "Events"
                  : "Statistics"}
              </h2>
              {activeTab === "profile" && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                isEditing ? "opacity-100" : "opacity-0"
              )}
            >
              {activeTab === "profile" && isEditing && (
                <EditProfileForm setIsEditing={setIsEditing} />
              )}
            </div>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                !isEditing ? "opacity-100" : "opacity-0"
              )}
            >
              {activeTab === "profile" && !isEditing && <ProfileInfo />}
              {activeTab === "events" && <UserEvents />}
              {activeTab === "stats" && <UserStats />}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
