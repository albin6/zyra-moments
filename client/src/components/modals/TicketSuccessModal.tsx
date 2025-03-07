import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Download,
  Share2,
  X,
  Calendar,
  Clock,
  MapPin,
  Ticket,
} from "lucide-react";
import Confetti from "react-confetti";
import { toast } from "sonner";
import { downloadTicketAsPdf } from "@/services/ticket/ticketService";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  pricePerTicket: number;
  ticketLimit: number;
  eventLocation: string;
  posterImage: string;
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  coordinates?: {
    type: string;
    coordinates: number[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ITicketEntity {
  _id: string;
  ticketId: string;
  userId: string;
  eventId: string;
  qrCode: string;
  status: "PURCHASED" | "USED" | "CANCELLED";
  isScanned: boolean;
  scannedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  ticketDetails: ITicketEntity;
}

const TicketSuccessModal = ({
  isOpen,
  onClose,
  event,
  ticketDetails,
}: TicketSuccessModalProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Format the event time for display
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  // Format the price for display
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownload = async () => {
    try {
      toast.success("Downloading ticket...");

      const data = await downloadTicketAsPdf(ticketDetails?._id || "");

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ticket-${ticketDetails.ticketId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss();
      toast.success("Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error downloading ticket:", error);
      toast.dismiss();
      toast.error("Failed to download ticket. Please try again.");
    }
  };

  const handleShare = () => {
    toast.success("Share options");
    // In a real app, implement actual sharing functionality
  };

  if (!ticketDetails?._id) {
    return;
  }
  return (
    <>
      {isOpen && showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md md:max-w-lg z-[1000]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl sm:text-2xl font-bold">
                Booking Confirmed!
              </DialogTitle>
            </div>
            <DialogDescription>
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="h-5 w-5" />
                <span>Your ticket has been booked successfully</span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Card className="border-2 border-dashed relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">
                        {event.title}
                      </h3>
                      <div className="flex flex-col space-y-1 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTimeRange(event.startTime, event.endTime)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.eventLocation}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Ticket ID</p>
                      <p className="font-mono text-xs">
                        {ticketDetails.ticketId}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">
                        {formatPrice(event.pricePerTicket)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <Ticket className="h-12 w-12 text-purple-500 mx-auto" />
                      <p className="text-xs text-center mt-2 text-gray-500">
                        Present this ticket at the venue
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="flex sm:justify-between flex-col sm:flex-row gap-3">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <Button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketSuccessModal;
