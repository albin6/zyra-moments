import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import Pagination from "../Pagination";

interface Vendor {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  averageRating: number;
}

export const VendorListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [vendors, setVendors] = useState<Vendor[] | null>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      profileImage: "/placeholder.svg?height=100&width=100",
      averageRating: 4.5,
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      profileImage: "/placeholder.svg?height=100&width=100",
      averageRating: 4.2,
    },
    // Add more vendors as needed
  ]);
  const limit = 1;

  if (!vendors) {
    return null;
  }

  const filteredVendors = vendors.filter((vendor) =>
    `${vendor.firstName} ${vendor.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "rating") {
      return b.averageRating - a.averageRating;
    }
    // Add more sorting options here
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vendors in {}</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search vendors..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedVendors.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={vendor.profileImage || "/placeholder.svg"}
                  alt={`${vendor.firstName} ${vendor.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{`${vendor.firstName} ${vendor.lastName}`}</h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {vendor.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        {totalPages > limit && (
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};
