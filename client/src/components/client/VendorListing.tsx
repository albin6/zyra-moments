import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

export interface VendorForListing {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  averageRating: number;
}

interface VendorListingProps {
  vendors: VendorForListing[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const VendorListing: React.FC<VendorListingProps> = ({
  vendors,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  limit,
  page,
  setPage,
  totalPages,
}) => {
  const navigate = useNavigate();
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
      {/* <h1 className="text-3xl font-bold mb-6">Vendors in {}</h1> */}

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
              <SelectItem value="name_asc">Name Ascending</SelectItem>
              <SelectItem value="name_desc">Name Descending</SelectItem>
              <SelectItem value="rating_high_to_low">
                Rating High-Low
              </SelectItem>
              <SelectItem value="rating_low_to_high">
                Rating High-Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedVendors.map((vendor) => (
          <Card key={vendor._id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 rounded-full object-cover">
                  <AvatarImage
                    src={vendor.profileImage}
                    alt={"/placeholder.svg"}
                  />
                  <AvatarFallback className="bg-primary/10">
                    {vendor.firstName.charAt(0) + vendor.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{`${vendor.firstName} ${vendor.lastName}`}</h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {vendor?.averageRating &&
                        vendor?.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate(`/discover/${vendor._id}/profile`)}
                variant="outline"
                className="w-full mt-4"
              >
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
