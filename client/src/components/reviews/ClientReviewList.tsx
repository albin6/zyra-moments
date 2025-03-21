import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "../Pagination";
import { useReviewsQuery } from "@/hooks/review/useReview";
import {
  clientGetAllReviewsByVendorId,
  PopulatedReview,
} from "@/services/review/reviewService";
import { Spinner } from "../ui/spinner";

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
    </div>
  );
};

export default function ClientReviewList({ vendorId }: { vendorId: string }) {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

  const { data, isLoading } = useReviewsQuery(
    clientGetAllReviewsByVendorId,
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
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!reviews) {
    return;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
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
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.reviewId} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
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
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {review.clientId.firstName} {review.clientId.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(review.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-2">
                      {review.comment || "No comment provided."}
                    </p>
                  </div>
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
