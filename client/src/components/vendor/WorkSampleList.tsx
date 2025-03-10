import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkSampleHeader } from "./WorkSampleHeader";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import {
  useWorkSampleMutation,
  useWorkSampleQuery,
} from "@/hooks/work-sample/useWorkSample";
import {
  deleteWorkSample,
  getAllWorkSampleByVendor,
} from "@/services/vendor/vendorService";
import { WorkSample } from "@/types/WorkSample";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ConfirmationModal } from "../modals/ConfirmationModal";

export function WorkSampleList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<WorkSample[] | null>(null);
  const limit = 5;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [workSampleToDelete, setWorkSampleToDelete] = useState<string | null>(
    null
  );

  const confirmBlock = () => {
    deleteSample(workSampleToDelete, {
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => toast.error(error.response.data.message),
    });
  };

  const { data, isLoading } = useWorkSampleQuery(
    getAllWorkSampleByVendor,
    page,
    limit
  );

  const { mutate: deleteSample } = useWorkSampleMutation(deleteWorkSample);

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
      <WorkSampleHeader />
      {totalPages === 0 ? (
        <h1 className="text-center">No Worksamples</h1>
      ) : (
        items.map((item) => (
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
            <div>
              <Button
                variant="outline"
                className="shrink-0 mr-4"
                onClick={() => {
                  setWorkSampleToDelete(item._id);
                  setIsConfirmationModalOpen(true);
                }}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                className="shrink-0"
                onClick={() => navigate(`/vendor/work-sample/${item._id}`)}
              >
                View
              </Button>
            </div>
          </Card>
        ))
      )}
      {totalPages > limit && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => {
          confirmBlock();
          setWorkSampleToDelete(null);
        }}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
        confirmText="Yes, I'm sure"
        cancelText="No, cancel"
      />
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
