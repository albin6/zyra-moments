import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useBestVendorsQuery } from "@/hooks/vendor/useBestVendors";
import { BestVendor } from "@/services/vendor/vendorService";
import { Spinner } from "../ui/spinner";

export const ClientLandingBestVendorSection: React.FC = () => {
  const navigate = useNavigate();
  const [bestVendors, setBestVendors] = useState<BestVendor[] | null>(null);
  const { data, isLoading } = useBestVendorsQuery();

  useEffect(() => {
    if (data) {
      setBestVendors(data.vendors);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!bestVendors) {
    return null;
  }
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Our Best Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {bestVendors.map((vendor) => (
          <Card
            key={vendor._id}
            onClick={() => navigate(`/discover/${vendor._id}/profile`)}
            className="group hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={vendor.profileImage} alt={vendor.firstName} />
                <AvatarFallback>
                  {vendor.firstName[0] + vendor.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">
                {vendor.firstName + " " + vendor.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {vendor.category?.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
