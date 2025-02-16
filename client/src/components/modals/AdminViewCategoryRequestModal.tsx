import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllCategoryJoinRequestQuery,
  useAllJoinCategoryRequestMutation,
} from "@/hooks/admin/useAllCategoryJoinRequest";
import { RequestItem } from "@/services/admin/adminService";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const ViewCatgoryRequestModal: React.FC = () => {
  const [categoryRequest, setCategoryRequest] = useState<RequestItem[] | null>(
    null
  );
  const { data, isLoading } = useAllCategoryJoinRequestQuery();
  const { mutate: updateRequestStatus } = useAllJoinCategoryRequestMutation();

  const updateStatus = (id: string, newStatus: string) => {
    updateRequestStatus(
      { id, status: newStatus },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  useEffect(() => {
    if (data?.success) {
      setCategoryRequest(data.requests);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!categoryRequest) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">View Category Requests</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Category Requests</DialogTitle>
          <DialogDescription>
            Review and manage category requests from vendors.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryRequest.map((request) => (
                <TableRow key={request._id}>
                  <TableCell className="font-medium">
                    {request.vendorId.firstName +
                      " " +
                      request.vendorId.lastName}
                  </TableCell>
                  <TableCell>{request.categoryId.title}</TableCell>
                  <TableCell className="text-center">
                    {request.status}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {["accepted", "rejected"].includes(request.status) ? (
                      <Button variant={"ghost"} size="sm">
                        Acknowledged
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => updateStatus(request._id, "accepted")}
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => updateStatus(request._id, "rejected")}
                          variant="outline"
                          size="sm"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCatgoryRequestModal;
