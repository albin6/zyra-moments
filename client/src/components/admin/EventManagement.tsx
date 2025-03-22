import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../Pagination";
import { PopulatedEvent } from "@/types/Event";
import { usePaginatedEvents } from "@/hooks/event/useEvent";
import _, { StringNullableChain } from "lodash";
import { AdminFundReleaseModal } from "../modals/AdminFundReleaseList";
import {
  useFundReleaseMutation,
  useReleaseFundQuery,
} from "@/hooks/event/useReleaseFund";
import { Spinner } from "../ui/spinner";
import {
  FundReleaseRequestResponse,
  updateFundReleaseRequestStatus,
} from "@/services/event/fundReleaseService";
import { toast } from "sonner";

export default function EventManagement() {
  const [events, setEvents] = useState<PopulatedEvent[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const limit = 5;

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      setDebouncedSearchTerm(query);
    }, 500),
    []
  );

  const { data, isLoading } = usePaginatedEvents(
    currentPage,
    limit,
    debouncedSearchTerm,
    statusFilter,
    dateFilter
  );

  useEffect(() => {
    if (data) {
      setEvents(data.events);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       setLoading(true);
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       let filteredEvents = [...mockEvents];

  //       if (statusFilter !== "all") {
  //         const status = statusFilter === "active";
  //         filteredEvents = filteredEvents.filter(
  //           (event) => event.status === status
  //         );
  //       }

  //       if (dateFilter) {
  //         const filterDate = new Date(dateFilter);
  //         filteredEvents = filteredEvents.filter((event) => {
  //           const eventDate = new Date(event.date);
  //           return eventDate.toDateString() === filterDate.toDateString();
  //         });
  //       }

  //       if (searchQuery) {
  //         const query = searchQuery.toLowerCase();
  //         filteredEvents = filteredEvents.filter(
  //           (event) =>
  //             event.title.toLowerCase().includes(query) ||
  //             event.eventLocation.toLowerCase().includes(query)
  //         );
  //       }

  //       setEvents(filteredEvents);
  //       setTotalPages(mockPaginatedEvents.totalPages);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, [statusFilter, dateFilter, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setDateFilter(undefined);
    setSearchQuery("");
  };

  const { mutate: updateReleaseStatus } = useFundReleaseMutation(
    updateFundReleaseRequestStatus
  );

  const handleUpdateReleaseStatus = (requestId: string) => {
    updateReleaseStatus(
      { requestId, status: "APPROVED" },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const { data: fundReleaseList, isLoading: fundReleaseListLoading } =
    useReleaseFundQuery();

  if (!events) {
    return;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>Manage your hosted events</CardDescription>
            </div>
            {fundReleaseListLoading || !fundReleaseList ? (
              <Spinner />
            ) : (
              <AdminFundReleaseModal
                onUpdateClick={handleUpdateReleaseStatus}
                requests={fundReleaseList?.data}
              />
            )}
            <Button
              variant="outline"
              onClick={resetFilters}
              className="self-start md:self-auto"
            >
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  debouncedSearch(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[240px] justify-start text-left font-normal",
                      !dateFilter && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Events Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Event Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date & Time
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton className="h-6 w-[200px]" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-[150px]" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-6 w-[180px]" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Skeleton className="h-6 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[80px]" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : events.length > 0 ? (
                  events.map((event) => (
                    <TableRow key={String(event._id)}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="truncate max-w-[250px]">
                            {event.title}
                          </span>
                          <span className="text-xs text-muted-foreground md:hidden">
                            {format(new Date(event.date), "MMM d, yyyy")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(event.date), "MMM d, yyyy")}
                        <div className="text-xs text-muted-foreground">
                          {event.startTime} - {event.endTime}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell truncate max-w-[200px]">
                        {event.eventLocation}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        ${event.pricePerTicket.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.status ? "default" : "secondary"}>
                          {event.status ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No events found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile view for small screens - Card layout */}
          <div className="sm:hidden mt-6 space-y-4">
            {isLoading ? (
              // isLoading skeletons for mobile
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={`mobile-skeleton-${index}`}>
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <div className="flex justify-between mt-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </CardContent>
                </Card>
              ))
            ) : events.length > 0 ? (
              events.map((event) => (
                <Card key={`mobile-${String(event._id)}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate max-w-[200px]">
                        {event.title}
                      </h3>
                      <Badge
                        variant={event.status ? "default" : "secondary"}
                        className="ml-2"
                      >
                        {event.status ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <div className="flex justify-between">
                        <span>
                          {format(new Date(event.date), "MMM d, yyyy")}
                        </span>
                        <span>${event.pricePerTicket.toFixed(2)}</span>
                      </div>
                      <div className="mt-1 truncate">{event.eventLocation}</div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-4">No events found.</div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && events.length > 0 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
