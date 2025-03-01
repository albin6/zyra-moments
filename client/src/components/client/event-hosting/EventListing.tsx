import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    subtitle: string;
    date: Date;
    pricePerTicket: number;
    posterImage: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center p-6 gap-6">
          {/* Left section - Logo and hosts */}
          <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
            <img
              src={event.posterImage || "/placeholder.svg"}
              alt="Event logo"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Middle section - Event details */}
          <div className="flex-grow space-y-2">
            <div>
              <h3 className="font-semibold tracking-tight text-foreground">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground">{event.subtitle}</p>
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

          {/* Right section - Actions */}
          <div className="flex flex-col gap-2">
            <Button variant="default" size="sm" className="w-20">
              View
            </Button>
            <Button variant="outline" size="sm" className="w-20">
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
