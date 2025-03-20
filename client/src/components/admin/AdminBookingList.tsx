"use client";

import type React from "react";

import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Pagination from "../Pagination";

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

interface AdminBookingListProps {
  bookings: BookingList[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdminBookingList({
  bookings,
  page,
  setPage,
  totalPages,
  sortBy,
  setSortBy,
}: AdminBookingListProps) {
  const handleSort = (field: string) => {
    setSortBy(
      sortBy === field ? `-${field}` : sortBy === `-${field}` ? "" : field
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-500/10 text-blue-700";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700";
      case "cancelled":
        return "bg-red-500/10 text-red-700";
      case "completed":
        return "bg-green-500/10 text-green-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy === field) return <ChevronUp className="h-4 w-4" />;
    if (sortBy === `-${field}`) return <ChevronDown className="h-4 w-4" />;
    return null;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const TableHeadSortable = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <TableHead
      onClick={() => handleSort(field)}
      className="cursor-pointer hover:bg-muted/50"
    >
      <div className="flex items-center gap-2">
        <span>{children}</span>
        <span>{getSortIcon(field)}</span>
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Booking Management
        </h2>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadSortable field="serviceTitle">
                Service
              </TableHeadSortable>
              <TableHeadSortable field="clientName">Client</TableHeadSortable>
              <TableHeadSortable field="vendorName">Vendor</TableHeadSortable>
              <TableHeadSortable field="bookingDate">Date</TableHeadSortable>
              <TableHeadSortable field="totalPrice">Price</TableHeadSortable>
              <TableHeadSortable field="status">Status</TableHeadSortable>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="font-medium">
                    {booking.serviceDetails.serviceTitle}
                  </TableCell>
                  <TableCell>
                    {booking.userId.firstName} {booking.userId.lastName}
                  </TableCell>
                  <TableCell>
                    {booking.vendorId.firstName} {booking.vendorId.lastName}
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(booking.bookingDate),
                      "MMM d, yyyy h:mm a"
                    )}
                  </TableCell>
                  <TableCell>{formatPrice(booking.totalPrice)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(booking.status)}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <BookingDetailsDialog booking={booking} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking._id}>
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span className="truncate">
                    {booking.serviceDetails.serviceTitle}
                  </span>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(booking.status)}
                  >
                    {booking.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Client:</span>
                  <span className="text-right">
                    {booking.userId.firstName} {booking.userId.lastName}
                  </span>
                  <span className="text-muted-foreground">Vendor:</span>
                  <span className="text-right">
                    {booking.vendorId.firstName} {booking.vendorId.lastName}
                  </span>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-right">
                    {format(
                      new Date(booking.bookingDate),
                      "MMM d, yyyy h:mm a"
                    )}
                  </span>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="text-right">
                    {formatPrice(booking.totalPrice)}
                  </span>
                </div>
                <div className="mt-4">
                  <BookingDetailsDialog booking={booking} isMobile />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No bookings found.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

function BookingDetailsDialog({
  booking,
  isMobile = false,
}: {
  booking: BookingList;
  isMobile?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={isMobile ? "default" : "outline"}
          size="sm"
          className={isMobile ? "w-full" : ""}
        >
          {isMobile ? "View Details" : <Eye className="h-4 w-4" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Service:</span>
            <span className="col-span-2">
              {booking.serviceDetails.serviceTitle}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Description:</span>
            <span className="col-span-2">
              {booking.serviceDetails.serviceDescription}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Client:</span>
            <span className="col-span-2">
              {booking.userId.firstName} {booking.userId.lastName}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Vendor:</span>
            <span className="col-span-2">
              {booking.vendorId.firstName} {booking.vendorId.lastName}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Date:</span>
            <span className="col-span-2">
              {format(new Date(booking.bookingDate), "MMMM d, yyyy")}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Time:</span>
            <span className="col-span-2">
              {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Duration:</span>
            <span className="col-span-2">
              {booking.serviceDetails.serviceDuration} minutes
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Price:</span>
            <span className="col-span-2">${booking.totalPrice.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-2">
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Payment Status:</span>
            <span className="col-span-2">{booking.paymentStatus}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Created:</span>
            <span className="col-span-2">
              {format(new Date(booking.createdAt), "MMMM d, yyyy h:mm a")}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-blue-500/10 text-blue-700";
    case "pending":
      return "bg-yellow-500/10 text-yellow-700";
    case "cancelled":
      return "bg-red-500/10 text-red-700";
    case "completed":
      return "bg-green-500/10 text-green-700";
    default:
      return "bg-muted text-muted-foreground";
  }
}
