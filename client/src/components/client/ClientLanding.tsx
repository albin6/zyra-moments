import type React from "react";
import { Button } from "@/components/ui/button";

import { ClientLandingCategorySection } from "./ClientLandingCategorySection";
import { UpcomingEventsSection } from "./UpcomingEventsSection";
import ClientLandingHeroCarouselSection from "./ClientLandingHeroCarouselSection";
import { ClientLandingBestVendorSection } from "./ClientLandingBestVendorSection";

const ClientLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Carousel */}
      <ClientLandingHeroCarouselSection />
      <ClientLandingCategorySection />

      <UpcomingEventsSection />

      <ClientLandingBestVendorSection />

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
