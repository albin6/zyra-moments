import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoadingEventDetails() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Skeleton className="h-10 w-48 mb-2" />
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-[400px] rounded-lg" />

        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />

            <div className="space-y-4 mb-6">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
            </div>

            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Skeleton className="w-full h-[300px] rounded-lg" />
        <Skeleton className="w-full h-[300px] rounded-lg" />
      </div>

      <Skeleton className="w-full h-[200px] rounded-lg mb-8" />
      <Skeleton className="w-full h-[100px] rounded-lg" />
    </div>
  );
}
