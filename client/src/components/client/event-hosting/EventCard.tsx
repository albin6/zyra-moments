import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PopulatedEvents } from "@/types/Event";
import { EventModal } from "@/components/modals/EventModal";
import { useState } from "react";

interface EventCardProps {
  event: PopulatedEvents;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card className="overflow-hidden">
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
                  <span>{format(event.date, "MMM dd, yyyy")}</span>
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
              <Button variant="outline" size="sm" className="w-20">
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
  );
}
