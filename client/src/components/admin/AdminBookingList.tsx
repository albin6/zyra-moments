"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Search, X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminBookingQuery } from "@/hooks/booking/useBooking";
import { getClientBookingsInAdmin } from "@/services/booking/bookingServices";

export interface BookingList {
  serviceDetails: {
    serviceTitle: string;
    serviceDescription: string;
    serviceDuration: number;
    servicePrice: number;
    additionalHoursPrice: number;
    cancellationPolicies: string[];
    termsAndConditions: string[];
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  vendorId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isClientApproved: boolean;
  isVendorApproved: boolean;
  bookingDate: string;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  __v: number;
  paymentId: string;
}

type BookingResponse = {
  bookings: BookingList[];
  totalPages: number;
  currentPage: number;
};

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const sortOptions = [
  { value: "createdAt", label: "Default" },
  { value: "serviceTitle", label: "Service Title (A-Z)" },
  { value: "-serviceTitle", label: "Service Title (Z-A)" },
  { value: "clientName", label: "Client Name (A-Z)" },
  { value: "-clientName", label: "Client Name (Z-A)" },
  { value: "vendorName", label: "Vendor Name (A-Z)" },
  { value: "-vendorName", label: "Vendor Name (Z-A)" },
  { value: "bookingDate", label: "Booking Date (Asc)" },
  { value: "-bookingDate", label: "Booking Date (Desc)" },
  { value: "totalPrice", label: "Price (Low-High)" },
  { value: "-totalPrice", label: "Price (High-Low)" },
  { value: "Date:+Newest", label: "Newest First" },
  { value: "Date:+Oldest", label: "Oldest First" },
];

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "confirmed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getPaymentStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function AdminBookingList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookings, setBookings] = useState<BookingList[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingList | null>(
    null
  );
  const limit = 2;

  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const sort = searchParams.get("sort") || "";

    setCurrentPage(page);
    setSearchTerm(search);
    setDebouncedSearchTerm(search);
    setStatusFilter(status);
    setSortBy(sort);
  }, []);

  // Update URL when filters change
  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   if (currentPage !== 1) params.set("page", currentPage.toString());
  //   if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
  //   if (statusFilter !== "all") params.set("status", statusFilter);
  //   if (sortBy) params.set("sort", sortBy);

  //   setSearchParams(params);
  // }, [currentPage, debouncedSearchTerm, statusFilter, sortBy]);

  const { data, isLoading } = useAdminBookingQuery(
    getClientBookingsInAdmin,
    currentPage,
    limit,
    sortBy,
    searchTerm,
    statusFilter
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (data) {
      setBookings(data.bookings);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    if (currentPage !== 1) setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setStatusFilter("all");
    setSortBy("");
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return format(new Date(`2000-01-01T${timeString}`), "h:mm a");
    } catch (error) {
      return timeString;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Booking Management</CardTitle>
            <CardDescription>
              Manage all bookings, view details, and update status
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {(debouncedSearchTerm || statusFilter !== "all" || sortBy) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-8 gap-1"
              >
                <X className="h-3.5 w-3.5" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by service title or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Service</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Loading bookings...
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      <div className="max-w-[250px]">
                        <div className="font-medium truncate">
                          {booking.serviceDetails.serviceTitle}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {booking.serviceDetails.serviceDescription}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {booking.userId.firstName} {booking.userId.lastName}
                    </TableCell>
                    <TableCell>
                      {booking.vendorId.firstName} {booking.vendorId.lastName}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{formatDate(booking.bookingDate)}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(booking.timeSlot.startTime)} -{" "}
                          {formatTime(booking.timeSlot.endTime)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>${booking.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusBadgeColor(booking.status)}
                        variant="outline"
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getPaymentStatusBadgeColor(
                          booking.paymentStatus
                        )}
                        variant="outline"
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Eye className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                            <DialogDescription>
                              Complete information about this booking
                            </DialogDescription>
                          </DialogHeader>
                          {selectedBooking && (
                            <ScrollArea className="max-h-[70vh]">
                              <div className="space-y-6 py-4">
                                <div>
                                  <h3 className="text-lg font-medium">
                                    Service Information
                                  </h3>
                                  <Separator className="my-2" />
                                  <div className="grid gap-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Title:
                                      </span>
                                      <span className="font-medium">
                                        {
                                          selectedBooking.serviceDetails
                                            .serviceTitle
                                        }
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Duration:
                                      </span>
                                      <span>
                                        {
                                          selectedBooking.serviceDetails
                                            .serviceDuration
                                        }{" "}
                                        minutes
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Base Price:
                                      </span>
                                      <span>
                                        $
                                        {selectedBooking.serviceDetails.servicePrice.toFixed(
                                          2
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Additional Hour Price:
                                      </span>
                                      <span>
                                        $
                                        {selectedBooking.serviceDetails.additionalHoursPrice.toFixed(
                                          2
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-lg font-medium">
                                    Booking Information
                                  </h3>
                                  <Separator className="my-2" />
                                  <div className="grid gap-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Booking ID:
                                      </span>
                                      <span className="font-mono text-sm">
                                        {selectedBooking._id}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Date:
                                      </span>
                                      <span>
                                        {formatDate(
                                          selectedBooking.bookingDate
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Time:
                                      </span>
                                      <span>
                                        {formatTime(
                                          selectedBooking.timeSlot.startTime
                                        )}{" "}
                                        -{" "}
                                        {formatTime(
                                          selectedBooking.timeSlot.endTime
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Total Price:
                                      </span>
                                      <span className="font-medium">
                                        ${selectedBooking.totalPrice.toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Status:
                                      </span>
                                      <Badge
                                        className={getStatusBadgeColor(
                                          selectedBooking.status
                                        )}
                                        variant="outline"
                                      >
                                        {selectedBooking.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Payment Status:
                                      </span>
                                      <Badge
                                        className={getPaymentStatusBadgeColor(
                                          selectedBooking.paymentStatus
                                        )}
                                        variant="outline"
                                      >
                                        {selectedBooking.paymentStatus}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Payment ID:
                                      </span>
                                      <span className="font-mono text-sm">
                                        {selectedBooking.paymentId || "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Created At:
                                      </span>
                                      <span>
                                        {formatDate(selectedBooking.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-lg font-medium">
                                    Client Information
                                  </h3>
                                  <Separator className="my-2" />
                                  <div className="grid gap-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Name:
                                      </span>
                                      <span>
                                        {selectedBooking.userId.firstName}{" "}
                                        {selectedBooking.userId.lastName}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Client ID:
                                      </span>
                                      <span className="font-mono text-sm">
                                        {selectedBooking.userId._id}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Approved:
                                      </span>
                                      <Badge
                                        variant={
                                          selectedBooking.isClientApproved
                                            ? "default"
                                            : "outline"
                                        }
                                      >
                                        {selectedBooking.isClientApproved
                                          ? "Yes"
                                          : "No"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-lg font-medium">
                                    Vendor Information
                                  </h3>
                                  <Separator className="my-2" />
                                  <div className="grid gap-2">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Name:
                                      </span>
                                      <span>
                                        {selectedBooking.vendorId.firstName}{" "}
                                        {selectedBooking.vendorId.lastName}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Vendor ID:
                                      </span>
                                      <span className="font-mono text-sm">
                                        {selectedBooking.vendorId._id}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Approved:
                                      </span>
                                      <Badge
                                        variant={
                                          selectedBooking.isVendorApproved
                                            ? "default"
                                            : "outline"
                                        }
                                      >
                                        {selectedBooking.isVendorApproved
                                          ? "Yes"
                                          : "No"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {selectedBooking.serviceDetails
                                  .cancellationPolicies.length > 0 && (
                                  <div>
                                    <h3 className="text-lg font-medium">
                                      Cancellation Policies
                                    </h3>
                                    <Separator className="my-2" />
                                    <ul className="list-disc pl-5 space-y-1">
                                      {selectedBooking.serviceDetails.cancellationPolicies.map(
                                        (policy, index) => (
                                          <li key={index}>{policy}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                                {selectedBooking.serviceDetails
                                  .termsAndConditions.length > 0 && (
                                  <div>
                                    <h3 className="text-lg font-medium">
                                      Terms and Conditions
                                    </h3>
                                    <Separator className="my-2" />
                                    <ul className="list-disc pl-5 space-y-1">
                                      {selectedBooking.serviceDetails.termsAndConditions.map(
                                        (term, index) => (
                                          <li key={index}>{term}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </ScrollArea>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
