import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useUpcomingEventsQuery } from "@/hooks/event/useEvent";
import { PopulatedEvents } from "@/types/Event";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import moment from "moment";
import { ClientContextType } from "./UserProfile";
import { getUpcomingEvents } from "@/services/event/eventService";

export function UpcomingEventsSection() {
  const { clientData } = useOutletContext<ClientContextType>();
  const navigate = useNavigate();

  const [hostedEvents, setHostedEvents] = useState<PopulatedEvents[] | null>(
    null
  );

  const { data, isLoading } = useUpcomingEventsQuery(getUpcomingEvents);

  useEffect(() => {
    if (data) {
      setHostedEvents(data.events);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!hostedEvents) {
    return null;
  }
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              What's happening next?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover the hottest upcoming events in your area. From
              conferences to festivals, we've got you covered with the most
              exciting gatherings on the horizon.
            </p>
            <Button
              onClick={() => navigate("/events/discover")}
              className="group w-full sm:w-auto"
              variant="secondary"
            >
              View All Events
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => navigate("/events/mc")}
              className="group w-full sm:w-auto ml-2"
              variant="secondary"
              disabled={clientData?.masterOfCeremonies}
            >
              See More
            </Button>
          </div>
          <div className="lg:w-2/3">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {hostedEvents.map((event, index) => (
                  <Card
                    key={index}
                    className="w-[280px] sm:w-[300px] flex-shrink-0"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {moment(event.date).format("LLL")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {!event.eventLocation
                          ? "Not Available"
                          : event.eventLocation}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <CalendarDays className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        {/* {event.attendees.toLocaleString()} attendees */}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/events/discover/${event._id}/details`)
                        }
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
}
