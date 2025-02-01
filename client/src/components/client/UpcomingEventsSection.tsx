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

const upcomingEvents = [
  {
    title: "Tech Conference 2025",
    date: "May 15-17, 2025",
    location: "San Francisco, CA",
    attendees: 5000,
  },
  {
    title: "Summer Music Festival",
    date: "July 1-3, 2025",
    location: "Austin, TX",
    attendees: 15000,
  },
  {
    title: "Global Business Summit",
    date: "September 10-12, 2025",
    location: "New York, NY",
    attendees: 3000,
  },
  {
    title: "Art & Design Expo",
    date: "October 5-7, 2025",
    location: "Chicago, IL",
    attendees: 7500,
  },
  {
    title: "Winter Wonderland Gala",
    date: "December 18, 2025",
    location: "Aspen, CO",
    attendees: 1000,
  },
];

export function UpcomingEventsSection() {
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
            <Button className="group w-full sm:w-auto" variant="secondary">
              View All Events
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="lg:w-2/3">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {upcomingEvents.map((event, index) => (
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
                        {event.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.location}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <CalendarDays className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        {event.attendees.toLocaleString()} attendees
                      </div>
                      <Button variant="ghost" size="sm">
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
