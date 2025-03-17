// components/UserProfile.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Menu } from "lucide-react";
import { ClientSidebar } from "./ClientSidebar";
import { ProfileInfo } from "./ProfileInfo";
import { EditProfileForm } from "./EditProfileForm";
import PurchasedTickets from "./PurchasedTickets";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useClientProfileMutation } from "@/hooks/client/useClientProfile";
import { Client } from "@/services/client/clientService";
import { toast } from "sonner";
import { useOutletContext } from "react-router-dom";
import { ClientBookingListing } from "@/pages/client/ClientBookingListing";
import ClientWallet from "@/pages/client/ClientWallet";
import ClientTransactions from "@/pages/client/ClientTransactions";
import { TransformedEventData } from "@/utils/format/transformEventFormData";
import { EventList } from "./event-hosting/EventList";
import EventForm from "./event-hosting/EventForm";
import EditEvent from "./event-hosting/EditEvent";
import { useEventMutation } from "@/hooks/event/useEvent";
import { editHostEvent, hostNewEvent } from "@/services/event/eventService";
import { ChatPage } from "@/pages/chat/ChatPage";

export interface ClientContextType {
  clientData: Client | null;
  setClientData: React.Dispatch<React.SetStateAction<Client | null>>;
}

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const { clientData } = useOutletContext<ClientContextType>();
  const { mutate: updateClientProfile } = useClientProfileMutation();

  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const handleUpdateClientProfile = (values: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
  }) => {
    updateClientProfile(
      {
        firstName: values?.firstName || "",
        lastName: values?.lastName || "",
        phoneNumber: values?.phoneNumber || "",
        profileImage: values?.profileImage,
      },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const { mutate: newEvent } = useEventMutation(hostNewEvent);
  const { mutate: updateEvent } = useEventMutation(editHostEvent);

  const handleCreateSubmit = async (data: TransformedEventData) => {
    try {
      console.log("Creating event with data:", data);
      newEvent(data, {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      });
      setActiveTab("event-list");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  const handleEditSubmit = async (data: TransformedEventData) => {
    try {
      console.log("Updating event with ID:", currentEventId);
      console.log("Update data:", data);
      updateEvent(
        { id: currentEventId, data },
        {
          onSuccess: (data) => toast.success(data.message),
          onError: (error: any) => toast.error(error.response.data.message),
        }
      );
      setActiveTab("event-list");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    }
  };

  const startCreateEvent = () => {
    setActiveTab("create-event");
  };

  const startEditEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    setActiveTab("edit-event");
  };

  if (!clientData) {
    return null; // Or a loading state
  }

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-background">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block w-64 shrink-0">
          <ClientSidebar
            firstName={clientData.firstName}
            lastName={clientData.lastName}
            profileImage={clientData.profileImage || ""}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            masterOfCerimoies={clientData.masterOfCeremonies}
          />
        </aside>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden mb-4">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ClientSidebar
              firstName={clientData.firstName}
              lastName={clientData.lastName}
              profileImage={clientData.profileImage || ""}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              masterOfCerimoies={clientData.masterOfCeremonies}
            />
          </SheetContent>
        </Sheet>

        <main className="flex-1">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeTab === "profile"
                  ? "Profile"
                  : activeTab === "events"
                  ? "Purchased Tickets"
                  : activeTab === "bookings"
                  ? "Bookings"
                  : activeTab === "event-list"
                  ? "My Events"
                  : activeTab === "create-event"
                  ? "Create Event"
                  : activeTab === "edit-event"
                  ? "Edit Event"
                  : activeTab === "client-wallet"
                  ? "Wallet"
                  : activeTab === "transactions"
                  ? "Transactions"
                  : activeTab === "chat"
                  ? "Messages"
                  : "Unknown"}
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
                <EditProfileForm
                  handleUpdateClientProfile={handleUpdateClientProfile}
                  data={clientData}
                  setIsEditing={setIsEditing}
                />
              )}
            </div>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                !isEditing ? "opacity-100" : "opacity-0"
              )}
            >
              {activeTab === "profile" && !isEditing && <ProfileInfo data={clientData} />}
              {activeTab === "events" && <PurchasedTickets />}
              {activeTab === "bookings" && <ClientBookingListing />}
              {activeTab === "event-list" && (
                <EventList onCreateNew={startCreateEvent} onEdit={startEditEvent} />
              )}
              {activeTab === "create-event" && (
                <EventForm onSubmit={handleCreateSubmit} setActiveTab={setActiveTab} />
              )}
              {activeTab === "edit-event" && currentEventId && (
                <EditEvent
                  eventId={currentEventId}
                  onSubmit={handleEditSubmit}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "client-wallet" && <ClientWallet />}
              {activeTab === "transactions" && <ClientTransactions />}
              {activeTab === "chat" && <ChatPage userType="Client" />}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}