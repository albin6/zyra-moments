import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkSampleHeader } from "./WorkSampleHeader";

interface WorkSampleItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface WorkSampleListProps {
  items: WorkSampleItem[];
  onView: (id: string) => void;
  isLoading?: boolean;
}

export function WorkSampleList({
  items,
  onView,
  isLoading,
}: WorkSampleListProps) {
  if (isLoading) {
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
      <WorkSampleHeader />
      {items.map((item) => (
        <Card
          key={item.id}
          className="flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
        >
          <div className="shrink-0">
            {item.image ? (
              <img
                src={item.image || "/placeholder.svg"}
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
            onClick={() => onView(item.id)}
          >
            View
          </Button>
        </Card>
      ))}
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
