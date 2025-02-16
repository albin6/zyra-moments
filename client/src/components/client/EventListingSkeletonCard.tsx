import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const EventListingSkeletonCard: React.FC = () => (
  <Card className="h-full flex flex-col">
    <Skeleton className="w-full h-48" />
    <CardContent className="flex-grow p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full" />
    </CardContent>
    <CardFooter className="p-4">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);
