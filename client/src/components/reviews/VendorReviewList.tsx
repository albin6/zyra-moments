import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Star, Calendar, Clock, DollarSign, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  PopulatedReview,
  vendorGetAllReviewsByVendorId,
} from "@/services/review/reviewService";
import { useReviewsQuery } from "@/hooks/review/useReview";
import Pagination from "../Pagination";
import { Spinner } from "../ui/spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Vendor } from "../layouts/VendorLayout";
import { useOutletContext } from "react-router-dom";

interface VendorContextType {
  vendorData: Vendor | null;
  setVendorData: React.Dispatch<React.SetStateAction<Vendor | null>>;
  joinCategoryRequestStatus: string | undefined;
}

// Helper component for star ratings
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = "";

  switch (status) {
    case "completed":
      color =
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      break;
    case "confirmed":
      color = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      break;
    case "pending":
      color =
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      break;
    case "cancelled":
      color = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      break;
    default:
      color = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function VendorReviewList() {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorId = useSelector((state: RootState) => state.vendor.vendor?.id);

  const { vendorData } = useOutletContext<VendorContextType>();

  if (!vendorId || ! vendorData) {
    return;
  }

  const limit = 5;

  const { data, isLoading } = useReviewsQuery(
    vendorGetAllReviewsByVendorId,
    currentPage,
    limit,
    sortBy,
    vendorId
  );

  const [reviews, setReviews] = useState<PopulatedReview[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    // In a real implementation, this would trigger a new fetch
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real implementation, this would trigger a new fetch
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!reviews) {
    return;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Reviews</h2>
          <div className="flex items-center mt-1">
            <StarRating rating={vendorData.averageRating} />
            <span className="ml-2 text-sm text-muted-foreground">
              ({vendorData.totalReviews} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="rating-desc">Highest Rating</SelectItem>
            <SelectItem value="rating-asc">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.reviewId} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={review.clientId.profileImage || "/placeholder.svg"}
                        alt={`${review.clientId.firstName} ${review.clientId.lastName}`}
                      />
                      <AvatarFallback>
                        {review.clientId.firstName?.[0]}
                        {review.clientId.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {review.clientId.firstName} {review.clientId.lastName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(review.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  {review.comment || "No comment provided."}
                </p>

                <Separator className="my-4" />

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-normal">
                      Booking #{review.bookingId._id?.toString().slice(-6)}
                    </Badge>
                    <StatusBadge status={review.bookingId.status} />
                  </div>

                  <h4 className="font-medium mb-2">
                    {review.bookingId.serviceDetails.serviceTitle}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{review.bookingId.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {review.bookingId.timeSlot.startTime} -{" "}
                        {review.bookingId.timeSlot.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${review.bookingId.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground cursor-help">
                          <Info className="h-3 w-3" />
                          <span>Client Contact Info</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <p>Email: {review.clientId.email}</p>
                          {review.clientId.phoneNumber && (
                            <p>Phone: {review.clientId.phoneNumber}</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
