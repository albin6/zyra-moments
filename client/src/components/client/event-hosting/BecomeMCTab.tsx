import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

interface BecomeMCTabProps {
  onNext: () => void;
  onPrevious: () => void;
  amount: string;
}

export function BecomeMCTab({ onNext, onPrevious, amount }: BecomeMCTabProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="p-0 sm:p-2">
        <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-center">
          <div className="w-full md:w-1/2 lg:w-5/12">
            <img
              src="https://res.cloudinary.com/dkgic4cru/image/upload/v1740813349/woman-spiral_uvic2g.jpg"
              alt="Colorful spiral with person"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-7/12 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Become a Master of Ceremonies!
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              To host events on our platform, you need to be promoted to the
              exclusive role of Master of Ceremonies (MC).
            </p>

            <div className="space-y-3 py-2">
              <h3 className="font-semibold text-lg md:text-xl text-foreground">
                Benefits:
              </h3>
              <ul className="grid gap-2.5">
                {[
                  "Unlock the ability to create and manage your own events",
                  "Reach a wide audience and showcase your talents or services",
                  "Get access to premium analytics and promotion tools",
                  "Join our exclusive community of event creators",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 py-2">
              <h3 className="font-semibold text-lg md:text-xl text-foreground">
                How to Get Started:
              </h3>
              <p className="text-muted-foreground">
                To become a Master of Ceremonies, a one-time promotion fee of{" "}
                <span className="font-medium text-foreground">{amount}</span> is
                required. This fee helps us ensure a premium hosting experience
                for you and our community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={onPrevious}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                size="lg"
              >
                Back
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                onClick={onNext}
                size="lg"
              >
                Continue to Payment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
