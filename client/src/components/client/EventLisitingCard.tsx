import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Event } from "./EventListing";

export const EventLisitingCard: React.FC<{ event: Event }> = ({ event }) => (
  <Card className="h-full flex flex-col">
    <img
      src={event.image || "/placeholder.svg"}
      alt={event.title}
      className="w-full h-48 object-cover"
    />
    <CardContent className="flex-grow p-4">
      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{event.category}</p>
      <div className="flex items-center text-sm mb-1">
        <Calendar className="mr-2 h-4 w-4" />
        {event.date}
      </div>
      <div className="flex items-center text-sm mb-1">
        <Clock className="mr-2 h-4 w-4" />
        {event.time}
      </div>
      <div className="flex items-center text-sm">
        <MapPin className="mr-2 h-4 w-4" />
        {event.location}
      </div>
    </CardContent>
    <CardFooter className="p-4">
      <Button className="w-full">View Details</Button>
    </CardFooter>
  </Card>
);
