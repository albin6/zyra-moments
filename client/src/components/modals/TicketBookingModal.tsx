import type React from "react";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TicketBookPaymentWrapper } from "../stripe/TicketBookForm";
import { ITicketEntity } from "./TicketSuccessModal";

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

interface TicketBookingModalProps {
  event: Event;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  setIsBookingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setTicketDetails: React.Dispatch<React.SetStateAction<ITicketEntity | null>>;
}

export default function TicketBookingModal({
  event,
  trigger,
  open,
  onOpenChange,
  setIsBookingSuccess,
  setIsOpen,
  setIsSuccess,
  setTicketDetails,
}: TicketBookingModalProps) {
  const [ticketCount, setTicketCount] = useState(1);

  // Format date and time
  const eventDate = parseISO(event.date);
  const formattedDate = format(eventDate, "EEEE, MMMM d, yyyy");

  // Format time from 24h to 12h format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const startTime = formatTime(event.startTime);
  const endTime = formatTime(event.endTime);

  // Calculate total price
  const subtotal = event.pricePerTicket * ticketCount;
  const serviceFee = Math.round(subtotal * 0.05); // 5% service fee
  const totalPrice = subtotal + serviceFee;

  const modalContent = (
    <div className="max-h-[80vh] overflow-y-auto">
      <DialogHeader className="mb-4">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Book Tickets</DialogTitle>
          {/* <DialogClose className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose> */}
        </div>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Event Details & Ticket Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Summary Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/3 h-[180px] rounded-lg overflow-hidden">
                  <img
                    src={event.posterImage || "/placeholder.svg"}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span>{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>
                        {startTime} - {endTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="line-clamp-1">
                        {event.eventLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Tickets</CardTitle>
              <CardDescription>
                Choose the number of tickets you want to purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Standard Ticket</p>
                  <p className="text-muted-foreground text-sm">
                    Access to the event
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">₹{event.pricePerTicket}</p>
                  {/* <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setTicketCount(Math.max(1, ticketCount - 1))
                      }
                      disabled={ticketCount <= 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {ticketCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setTicketCount(
                          Math.min(event.ticketLimit, ticketCount + 1)
                        )
                      }
                      disabled={ticketCount >= event.ticketLimit}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div> */}
                </div>
              </div>

              {event.ticketLimit - ticketCount < 5 && (
                <Alert className="mt-4">
                  <AlertDescription>
                    Only {event.ticketLimit - ticketCount} tickets left!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Please provide your details for the booking
              </CardDescription>
            </CardHeader>
            {/* <CardContent></CardContent> */}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"} × ₹
                    {event.pricePerTicket}
                  </span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>₹{serviceFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>* All prices are inclusive of taxes</p>
                  <p>* Tickets are non-refundable</p>
                </div>
              </CardContent>
              <CardFooter>
                {/* <Button
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                  onClick={onSubmit}
                >
                  {isProcessing ? "Processing..." : `Pay ₹${totalPrice}`}
                </Button> */}
                <TicketBookPaymentWrapper
                  eventId={event._id}
                  setTicketDetails={setTicketDetails}
                  amount={totalPrice}
                  setIsBookingSuccess={setIsBookingSuccess}
                  setIsOpen={setIsOpen}
                  setIsSuccess={setIsSuccess}
                  onOpenChange={onOpenChange}
                />
              </CardFooter>
            </Card>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Need help? Contact us at</p>
              <a href={`mailto:${event.hostId.email}`} className="text-primary">
                {event.hostId.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] p-6 z-[1000]">
        {modalContent}
      </DialogContent>
    </Dialog>
  );
}
