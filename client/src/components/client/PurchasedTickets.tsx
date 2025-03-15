import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  MoreVertical,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../Pagination";
import { useTicket, useTicketByUserQuery } from "@/hooks/event/useTicket";
import { PopulatedTicket } from "@/services/ticket/ticketService";
import { Spinner } from "../ui/spinner";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import moment from "moment";

export default function PurchasedTickets() {
  const [tickets, setTickets] = useState<PopulatedTicket[] | null>(null);
  const [ticketToCancel, setTicketToCancel] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  const { data, isLoading } = useTicketByUserQuery(page, limit);
  const { mutate: cancelTicket } = useTicket();

  useEffect(() => {
    if (data) {
      setTickets(data.tickets);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleCancelTicket = (ticketId: string) => {
    setTicketToCancel(ticketId);
    setShowDialog(true);
  };

  const confirmCancelTicket = () => {
    if (ticketToCancel) {
      cancelTicket({ ticketId: ticketToCancel });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!tickets) {
    return;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
        <p className="text-muted-foreground mt-2">
          Manage your purchased tickets for upcoming events
        </p>
      </div>

      {isLoading ? (
        // Loading skeleton
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg"
            >
              <Skeleton className="h-[100px] w-full md:w-[200px] rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-9 w-[100px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {tickets.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-medium">No tickets found</h3>
                  <p className="text-sm text-muted-foreground">
                    You haven't purchased any tickets yet.
                  </p>
                  <Button>Browse Events</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.ticketId} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">
                            {ticket.eventId.title}
                          </CardTitle>
                          <CardDescription className="text-sm font-medium text-primary">
                            {ticket.eventId.description}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleCancelTicket(ticket.eventId._id)
                              }
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                              <span>Cancel Ticket</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {moment(ticket.eventId.date).format("LLL")}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {ticket.eventId.startTime +
                              " - " +
                              ticket.eventId.endTime}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{ticket.eventId.eventLocation}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between items-center">
                        <div className="font-bold">
                        ₹{ticket.eventId.pricePerTicket}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={ticket.status === "USED" || ticket.status === "CANCELLED" }
                          onClick={() => handleCancelTicket(ticket._id)}
                        >
                          Cancel Ticket
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {tickets.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <ConfirmationModal
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={confirmCancelTicket}
        title="Cancel Ticket"
        message="Are you sure you want to cancel this ticket? This action cannot be
              undone."
        confirmText="Yes, I'm sure"
        cancelText="No, cancel"
      />
    </div>
  );
}
