import { EventModal } from "@/components/modals/EventModal";
import { QrVerificationModal } from "@/components/modals/QrVerificationModal";
import Pagination from "@/components/Pagination";
import QRScanner from "@/components/qr-code-scanner/QrScanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAllHostedEvents } from "@/hooks/event/useEvent";
import { getAllHostedEventsByClient } from "@/services/event/eventService";
import { PopulatedEvents } from "@/types/Event";
import { Plus } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

export const EventList = ({
  onCreateNew,
  onEdit,
}: {
  onCreateNew: () => void;
  onEdit: (eventId: string) => void;
}) => {
  const [hostedEvents, setHostedEvents] = useState<PopulatedEvents[] | null>(
    null
  );
  const [showQRScannerModal, setShowQRScannerModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "success" | "error"
  >("success");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 1;
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useAllHostedEvents(
    getAllHostedEventsByClient,
    currentPage,
    eventsPerPage
  );

  const handleShowSuccess = () => {
    setVerificationStatus("success");
    setShowModal(true);
  };

  const handleShowError = () => {
    setVerificationStatus("error");
    setShowModal(true);
  };

  useEffect(() => {
    if (data) {
      setHostedEvents(data.events);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!hostedEvents) {
    return null;
  }
  // This is a placeholder. Implement your actual event list here
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Events</CardTitle>
        <div className="flex space-x-4">
          <Button onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
          <Button onClick={() => setShowQRScannerModal(true)}>
            Track Attendance
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10">
          {hostedEvents.map((event) => (
            <>
              <Card className="overflow-hidden mb-2">
                <CardContent className="p-0">
                  <div className="flex items-center p-6 gap-6">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <img
                        src={event.posterImage || "/placeholder.svg"}
                        alt="Event logo"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-grow space-y-2">
                      <div>
                        <h3 className="font-semibold tracking-tight text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{moment(event.date).format("LLL")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Fee:</span>
                          <Badge variant="outline" className="font-normal">
                            ${event.pricePerTicket}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => setIsOpen(true)}
                        variant="default"
                        size="sm"
                        className="w-20"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => onEdit(event._id!)}
                        variant="outline"
                        size="sm"
                        className="w-20"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <EventModal
                event={event}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </>
          ))}

          <div className="mt-8">
            {totalPages > eventsPerPage && (
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </CardContent>
      <Dialog open={showQRScannerModal} onOpenChange={setShowQRScannerModal}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            {/* QR Scanner component rendered inside the modal */}
            {showQRScannerModal && (
              <QRScanner
                setShowQRScannerModal={setShowQRScannerModal}
                handleShowError={handleShowError}
                handleShowSuccess={handleShowSuccess}
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowQRScannerModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <QrVerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        status={verificationStatus}
        userName="The user"
        eventName="the Event."
        errorMessage="This QR code has already been scanned. Entry is not allowed."
      />
    </Card>
  );
};
