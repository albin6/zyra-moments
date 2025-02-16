import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

function ClientLandingPricingSection() {
  return (
    <section id="pricing" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Choose Your Perfect Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Basic",
              price: "$49",
              features: ["Up to 5 events", "Basic analytics", "Email support"],
            },
            {
              name: "Pro",
              price: "$99",
              features: [
                "Unlimited events",
                "Advanced analytics",
                "Priority support",
                "Team collaboration",
              ],
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: [
                "Custom solutions",
                "Dedicated account manager",
                "24/7 phone support",
                "On-site training",
              ],
            },
          ].map((plan, index) => (
            <Card key={index} className={index === 1 ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <ChevronRight size={16} className="mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {index === 2 ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientLandingPricingSection;
