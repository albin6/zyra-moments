import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DiscoverTabProps {
  onNext: () => void;
}

export function DiscoverTab({ onNext }: DiscoverTabProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="p-0 sm:p-2">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="w-full md:w-1/2 lg:w-5/12">
            <img
              src="https://res.cloudinary.com/dkgic4cru/image/upload/v1740813349/woman-spiral_uvic2g.jpg"
              alt="Colorful spiral with person"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-7/12 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Setting up events and ticketing made easy!
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              A dynamic event discovery and ticketing platform designed to
              empower event hosts. With our all-in-one solution, you can
              effortlessly boost ticket sales, engage attendees, and seamlessly
              manage every aspect of your event.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onNext}
                size="lg"
              >
                Start Hosting
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                size="lg"
              >
                Discover Events
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
