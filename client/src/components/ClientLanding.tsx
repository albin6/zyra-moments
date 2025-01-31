import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, Star } from "lucide-react";

const carouselImages = [
  "https://res.cloudinary.com/dkgic4cru/image/upload/v1738308963/concert-main_xawuyx.jpg",
  "https://res.cloudinary.com/dkgic4cru/image/upload/v1738309017/pexels-jeremy-wong-382920-1043902_y4u76q.jpg",
];

const ClientLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Carousel */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                Elevate Your Events with EventPro
              </h1>
              <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Streamline your event management process and create
                unforgettable experiences with our cutting-edge platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl">
              <Carousel className="w-full">
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`Event ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features for Seamless Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intuitive Planning Tools",
                description:
                  "Effortlessly plan and organize your events with our user-friendly interface.",
              },
              {
                title: "Real-time Collaboration",
                description:
                  "Work together with your team in real-time, ensuring everyone stays on the same page.",
              },
              {
                title: "Comprehensive Analytics",
                description:
                  "Gain valuable insights into your events' performance with detailed analytics.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Event Planner",
                quote:
                  "EventPro has revolutionized the way I manage events. It's a game-changer!",
              },
              {
                name: "Michael Chen",
                role: "Corporate Events Manager",
                quote:
                  "The analytics feature has helped us optimize our events and increase ROI.",
              },
              {
                name: "Emily Rodriguez",
                role: "Wedding Coordinator",
                quote:
                  "I can't imagine planning weddings without EventPro. It's simply the best!",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
                features: [
                  "Up to 5 events",
                  "Basic analytics",
                  "Email support",
                ],
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

      {/* Call-to-Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied event planners and take your events to
            the next level.
          </p>
          <Button size="lg" variant="secondary">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ClientLanding;
