import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FundReleaseRequestResponse } from "@/services/event/fundReleaseService";

interface AdminFundReleaseModalProps {
  requests: FundReleaseRequestResponse[];
  onUpdateClick?: (requestId: string) => void;
  triggerButtonText?: string;
}

export function AdminFundReleaseModal({
  requests,
  onUpdateClick,
  triggerButtonText = "View Fund Release Requests",
}: AdminFundReleaseModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fund Release Requests</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {requests.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No requests found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Tickets</TableHead>
                    <TableHead>Status</TableHead>
                    {onUpdateClick && <TableHead>Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.requestId}>
                      <TableCell>{request.requestId}</TableCell>
                      <TableCell>{request.eventId.title}</TableCell>
                      <TableCell>
                        ${request.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>{request.ticketSalesCount}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            request.status === "PENDING"
                              ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                              : request.status === "APPROVED"
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : request.status === "REJECTED"
                              ? "bg-red-50 text-red-700 ring-red-600/20"
                              : "bg-blue-50 text-blue-700 ring-blue-600/20"
                          }`}
                        >
                          {request.status}
                        </span>
                      </TableCell>
                      {onUpdateClick && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onUpdateClick(request.requestId);
                              setOpen(false); // Optionally close the modal when updating
                            }}
                          >
                            Update
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
