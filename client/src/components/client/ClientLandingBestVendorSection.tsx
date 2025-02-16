import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Vendor {
  id: string;
  name: string;
  category: string;
  image: string;
}

const vendors: Vendor[] = [
  {
    id: "1",
    name: "John Doe",
    category: "Catering",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Jane Smith",
    category: "Photography",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Mike Johnson",
    category: "Decoration",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Emily Brown",
    category: "Music",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "David Lee",
    category: "Venue",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Sarah Wilson",
    category: "Florist",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export const ClientLandingBestVendorSection: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Our Best Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {vendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="group hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={vendor.image} alt={vendor.name} />
                <AvatarFallback>
                  {vendor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
              <p className="text-sm text-muted-foreground">{vendor.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
