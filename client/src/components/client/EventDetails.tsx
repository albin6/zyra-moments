import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import LoadingEventDetails from "./LoadingEventDetails";
import { MapMarkerProps } from "./event-hosting/EventForm";
import moment from "moment";
import { Event } from "@/hooks/event/useEvent";
import TicketBookingModal from "../modals/TicketBookingModal";
import PaymentProcessingModal from "../modals/PaymentProcessingModal";
import TicketSuccessModal, {
  ITicketEntity,
} from "../modals/TicketSuccessModal";

function MapMarker({ position, setPosition }: MapMarkerProps) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  if (!position) {
    return;
  }

  return (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })}
    />
  );
}

export default function EventDetails({ event }: { event: Event }) {
  const [ticketCount, setTicketCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<ITicketEntity | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = event.pricePerTicket * ticketCount;

  if (!event) {
    return <LoadingEventDetails />;
  }

  function setMapPosition(pos: [number, number]): void {
    console.log(pos);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Event Details</h1>
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="relative w-full rounded-lg">
          <img
            src={event.posterImage || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {event.title}
            </h2>
            <p className="text-muted-foreground mb-6">{event.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>
                  {moment(event.date).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>
                  {event.startTime} - {event.endTime}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.eventLocation}</span>
              </div>

              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-primary" />
                <span>
                  ₹{event.pricePerTicket} per ticket ({event.ticketLimit}{" "}
                  tickets available)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <span>
                  Hosted by {event.hostId?.firstName} {event.hostId?.lastName}
                </span>
              </div>
            </div>

            {/* <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium">Share:</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Share via email</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Share on Instagram</span>
                </Button>
              </div>
            </div> */}

            <Button className="w-full">Book Now</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About The Event</h2>
            <div className="space-y-2 mb-6">
              <div className="flex flex-col">
                <span className="font-medium">Registration Fee</span>
                <span className="text-muted-foreground">
                  ₹{event.pricePerTicket}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Date</span>
                <span className="text-muted-foreground">
                  {moment(event.date).format("MMMM Do YYYY, h:mm:ss a")}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Venue</span>
                <span className="text-muted-foreground">
                  {event.eventLocation}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Contact</span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{event.hostId?.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{event.hostId?.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Host Information</h3>
              <p className="text-muted-foreground">
                {event.hostId?.firstName} {event.hostId?.lastName} is organizing
                this event. For any queries, please contact them directly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardContent className="p-0 h-[300px] md:h-[400px] relative">
            <div className="relative w-full h-[350px] rounded-md overflow-hidden border">
              {typeof window !== "undefined" && (
                <MapContainer
                  center={
                    event.coordinates && event.coordinates.coordinates
                      ? [
                          event.coordinates.coordinates[1],
                          event.coordinates.coordinates[0],
                        ]
                      : undefined
                  }
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapMarker
                    position={
                      event.coordinates
                        ? [
                            event.coordinates.coordinates[1],
                            event.coordinates.coordinates[0],
                          ]
                        : undefined
                    }
                    setPosition={setMapPosition}
                  />
                </MapContainer>
              )}
            </div>
            <div className="absolute -bottom-5 left-0 right-0 bg-background/90 p-4 text-center">
              <p className="text-sm font-medium">{event.eventLocation}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Book Your Tickets</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                disabled={ticketCount <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{ticketCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setTicketCount(Math.min(event.ticketLimit, ticketCount + 1))
                }
                disabled={ticketCount >= event.ticketLimit}
              >
                +
              </Button>
              <span className="text-muted-foreground">
                {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"}
              </span>
            </div> */}

            <div className="text-right">
              <p className="text-muted-foreground">
                Total Price{" "}
                <span className="text-xl font-bold">₹{totalPrice}</span>
              </p>
            </div>

            <Button onClick={() => setIsModalOpen(true)}>
              Proceed With Booking
            </Button>

            <TicketBookingModal
              setTicketDetails={setTicketDetails}
              event={event}
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              setIsBookingSuccess={setIsBookingSuccess}
              setIsOpen={setIsOpen}
              setIsSuccess={setIsSuccess}
            />

            <PaymentProcessingModal
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              isSuccess={isSuccess}
            />

            {isBookingSuccess && (
              <TicketSuccessModal
                isOpen={isBookingSuccess}
                onClose={() => setIsBookingSuccess(false)}
                event={event}
                ticketDetails={ticketDetails!}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">
            Organized by {event.hostId?.firstName} {event.hostId?.lastName}
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            For any queries regarding this event, please contact the organizer
            at {event.hostId?.email} or {event.hostId?.phoneNumber}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
