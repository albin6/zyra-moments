import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { useWorkSampleQuery } from "@/hooks/work-sample/useWorkSample";
import { getAllWorkSampleByVendor } from "@/services/vendor/vendorService";
import { WorkSample } from "@/types/WorkSample";
import { ServicesHeader } from "./ServicesHeader";

export function ServicesList() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<WorkSample[] | null>(null);
  const limit = 1;

  const { data, isLoading } = useWorkSampleQuery(
    getAllWorkSampleByVendor,
    page,
    limit
  );

  useEffect(() => {
    if (!data) return;

    setItems(data.workSamples);
    setTotalPages(data.totalPages);
    setPage(data.currentPage);
  }, [data]);

  if (isLoading || !items) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingItem key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <ServicesHeader />
      {items.map((item) => (
        <Card
          key={item._id}
          className="flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
        >
          <div className="shrink-0">
            {item.images.length ? (
              <img
                src={item.images[0] || "/placeholder.svg"}
                alt=""
                className="h-16 w-16 rounded-lg object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-muted" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{item.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>
          <Button
            variant="secondary"
            className="shrink-0"
            onClick={() => console.log(item._id)}
          >
            View
          </Button>
        </Card>
      ))}
      {totalPages > limit && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

function LoadingItem() {
  return (
    <Card className="flex items-center gap-4 p-4">
      <Skeleton className="h-16 w-16 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-10 w-16" />
    </Card>
  );
}
