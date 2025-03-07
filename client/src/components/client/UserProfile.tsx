import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Menu } from "lucide-react";
import { ClientSidebar } from "./ClientSidebar";
import { ProfileInfo } from "./ProfileInfo";
import { EditProfileForm } from "./EditProfileForm";
import { UserEvents } from "./UserEvents";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useClientProfileMutation } from "@/hooks/client/useClientProfile";
import { Client } from "@/services/client/clientService";
import { toast } from "sonner";
import { useOutletContext } from "react-router-dom";
import { ClientBookingListing } from "@/pages/client/ClientBookingListing";
import EventAddEdit from "@/pages/client/EventAddEdit";
import HostEventListing from "@/pages/client/HostEventListing";
import { useEventContext } from "@/context/EventContext";
import ClientWallet from "@/pages/client/ClientWallet";
import ClientTransactions from "@/pages/client/ClientTransactions";
import QRScanner from "../qr-code-scanner/QrScanner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export interface ClientContextType {
  clientData: Client | null;
  setClientData: React.Dispatch<React.SetStateAction<Client | null>>;
}

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isHostEventEditing, setIsHostEventEditing] = useState(false);
  const { clientData } = useOutletContext<ClientContextType>();
  const { mutate: updateClientProfile } = useClientProfileMutation();
  const { resetEventData } = useEventContext();

  const [showQRScannerModal, setShowQRScannerModal] = useState(false);

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

  if (!clientData) {
    return;
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
                {/* {activeTab === "profile"
                  ? "Profile"
                  : activeTab === "events"
                  ? "Events"
                  : activeTab === "bookings"
                  ? "Bookings"
                  : activeTab === "host-event"
                  ? "Bookings"
                  : activeTab === "event-list"
                  ? "My Events"
                  : activeTab === "client-wallet"
                  ? "Wallet"
                  : "something"} */}
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
              <div className="flex space-x-4">
                {activeTab === "event-list" && (
                  <Button size="sm" onClick={() => setShowQRScannerModal(true)}>
                    Track Attendance
                  </Button>
                )}
                {activeTab === "event-list" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      resetEventData();
                      setActiveTab("host-event");
                    }}
                  >
                    Host An Event
                  </Button>
                )}
              </div>
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
              {activeTab === "profile" && !isEditing && (
                <ProfileInfo data={clientData} />
              )}
              {activeTab === "events" && <UserEvents />}
              {activeTab === "bookings" && <ClientBookingListing />}

              {activeTab === "event-list" && (
                <HostEventListing setActiveTab={setActiveTab} />
              )}
              {activeTab === "host-event" && (
                <EventAddEdit
                  setActiveTab={setActiveTab}
                  setIsHostEventEditing={setIsHostEventEditing}
                  isHostEventEditing={isHostEventEditing}
                />
              )}
              {activeTab === "client-wallet" && <ClientWallet />}
              {activeTab === "transactions" && <ClientTransactions />}
            </div>
          </Card>
          <Dialog
            open={showQRScannerModal}
            onOpenChange={setShowQRScannerModal}
          >
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Scan QR Code</DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-center p-6">
                {/* QR Scanner component rendered inside the modal */}
                {showQRScannerModal && <QRScanner />}
              </div>
              <DialogFooter>
                <Button onClick={() => setShowQRScannerModal(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
