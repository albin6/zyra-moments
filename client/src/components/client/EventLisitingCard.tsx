import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Event } from "@/hooks/event/useEvent";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const EventLisitingCard: React.FC<{ event: Event }> = ({ event }) => {
  const navigate = useNavigate();
  return (
    <Card className="h-full flex flex-col">
      <img
        src={event.posterImage || "/placeholder.svg"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="flex-grow p-4">
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {event.description}
        </p>
        <div className="flex items-center text-sm mb-1">
          <Calendar className="mr-2 h-4 w-4" />
          {moment(event.date).format("LLL")}
        </div>
        <div className="flex items-center text-sm mb-1">
          <Clock className="mr-2 h-4 w-4" />
          {event.startTime}
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="mr-2 h-4 w-4" />
          {event.eventLocation}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className="w-full"
          onClick={() => navigate(`/events/discover/${event._id}/details`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
