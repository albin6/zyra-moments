import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const carouselImages = [
  "https://res.cloudinary.com/dkgic4cru/image/upload/v1738308963/concert-main_xawuyx.jpg",
  "https://res.cloudinary.com/dkgic4cru/image/upload/v1738309017/pexels-jeremy-wong-382920-1043902_y4u76q.jpg",
];
function ClientLandingHeroCarouselSection() {
  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Elevate Your Events with EventPro
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Streamline your event management process and create unforgettable
              experiences with our cutting-edge platform.
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
  );
}

export default ClientLandingHeroCarouselSection;
