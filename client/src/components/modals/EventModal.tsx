import { useEffect } from "react";
import { format } from "date-fns";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Ticket,
  Info,
  Share2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { CreateFundReleaseModal } from "./CreateFundReleaseModal";
import { useFundReleaseMutation } from "@/hooks/event/useReleaseFund";
import { createFundReleaseRequest } from "@/services/event/fundReleaseService";
import { toast } from "sonner";

export interface IEventEntity {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  pricePerTicket: number;
  ticketLimit: number;
  eventLocation: string;
  coordinates: {
    type: "Point";
    coordinates: number[];
  };
  posterImage?: string;
  hostId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PopulatedEvents extends Omit<IEventEntity, "hostId"> {
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
  };
}

interface EventModalProps {
  event: PopulatedEvents;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const { mutate: createFundRelease } = useFundReleaseMutation(
    createFundReleaseRequest
  );

  const handleFundReleaseRequest = (data: { message: string }) => {
    console.log(data);
    createFundRelease(
      { ...data, eventId: event._id },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const formattedDate = format(new Date(event.date), "EEEE, MMMM d, yyyy");

  const naviagte = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[1100px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-lg">
        <DialogHeader className="relative mb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold pr-8">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Hosted by {event.hostId.firstName} {event.hostId.lastName}
          </DialogDescription>
        </DialogHeader>

        {event.posterImage && (
          <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden mb-6 bg-muted relative group">
            <img
              src={event.posterImage || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=600&width=800";
              }}
            />
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full opacity-80 hover:opacity-100"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share event</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-semibold text-lg mb-3">About this event</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4 sm:p-5 space-y-4">
                <h3 className="font-semibold text-lg mb-2">Date and Time</h3>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-semibold text-lg mb-3">Location</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{event.eventLocation}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Coordinates: {event.coordinates.coordinates[0].toFixed(4)}
                      , {event.coordinates.coordinates[1].toFixed(4)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Host & Ticket Info */}
          <div className="space-y-5">
            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-semibold text-lg mb-3">Host</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage
                      src={event.hostId.profileImage}
                      alt={`${event.hostId.firstName} ${event.hostId.lastName}`}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {event.hostId.firstName[0]}
                      {event.hostId.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {event.hostId.firstName} {event.hostId.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.hostId.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.hostId.phoneNumber}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardContent className="p-4 sm:p-5 space-y-4">
                <h3 className="font-semibold text-lg mb-2">
                  Ticket Information
                </h3>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      ${event.pricePerTicket.toFixed(2)} per ticket
                    </p>
                    {event.pricePerTicket > 100 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Premium event pricing
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {event.ticketLimit} tickets available
                    </p>
                    {event.ticketLimit < 100 && (
                      <Badge variant="outline" className="mt-1">
                        Limited availability
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {(event.createdAt || event.updatedAt) && (
              <Card className="shadow-sm bg-muted/40">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground space-y-1">
                    {event.createdAt && (
                      <div className="flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        <p>
                          Created:{" "}
                          {format(new Date(event.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    )}
                    {event.updatedAt && (
                      <div className="flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        <p>
                          Updated:{" "}
                          {format(new Date(event.updatedAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <div className="flex flex-col">
                  <Button
                    className="m-4 mb-0"
                    onClick={() => naviagte(`/events/${event._id}/attendance`)}
                  >
                    View Attendance
                  </Button>
                  <CreateFundReleaseModal onCreate={handleFundReleaseRequest} />
                </div>
              </Card>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            onClick={() => onClose()}
            className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
