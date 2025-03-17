import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import Pagination from "../Pagination";
import moment from "moment";
import { formatPrice } from "@/utils/format/formatPrice";
import { BookingDetailsModal } from "../modals/BookingDetailsModal";
import { Button } from "../ui/button";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { useState } from "react";
import { useBookingStatusMutation } from "@/hooks/booking/useBooking";
import { clientUpdateBookingStatus } from "@/services/booking/bookingServices";
import { toast } from "sonner";

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
  search,
  setSearch,
}: AdminBookingListProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleSort = (field: string) => {
    setSortBy(
      sortBy === field ? `-${field}` : sortBy === `-${field}` ? "" : field
    );
  };

  const { mutate: updateBookingStatus } = useBookingStatusMutation(
    clientUpdateBookingStatus
  );

  const onUpdateStatus = () => {
    if (bookingId && status) {
      updateBookingStatus(
        { bookingId, status },
        {
          onSuccess: (data) => toast.success(data.message),
          onError: (error: any) => toast.error(error.response.data.message),
        }
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      case "completed":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy === field) return <ChevronUp className="w-3 h-3" />;
    if (sortBy === `-${field}`) return <ChevronDown className="w-3 h-3" />;
    return null;
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
      className="cursor-pointer bg-gray-50 text-gray-700 font-semibold text-xs uppercase tracking-wide hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <span className="w-3">{getSortIcon(field)}</span>
      </div>
    </TableHead>
  );

  const BookingCard = ({ booking }: { booking: BookingList }) => (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="bg-gray-50 p-3">
        <CardTitle className="text-sm font-semibold text-gray-800 flex justify-between items-center">
          <span>{booking.serviceDetails.serviceTitle}</span>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 text-xs text-gray-600 space-y-2">
        <div className="grid grid-cols-2 gap-1">
          <span className="font-medium">Client:</span>
          <span className="text-right">
            {booking.userId.firstName} {booking.userId.lastName}
          </span>
          <span className="font-medium">Vendor:</span>
          <span className="text-right">
            {booking.vendorId.firstName} {booking.vendorId.lastName}
          </span>
          <span className="font-medium">Date:</span>
          <span className="text-right">
            {moment(booking.bookingDate).format("MMM D, YYYY h:mm A")}
          </span>
          <span className="font-medium">Price:</span>
          <span className="text-right">{formatPrice(booking.totalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Booking Management</h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search bookings by service or ID..."
            className="pl-8 bg-white border-gray-300 text-gray-700 placeholder-gray-400 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block rounded-md border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHeadSortable field="serviceRequired">Service</TableHeadSortable>
              <TableHeadSortable field="clientName">Client</TableHeadSortable>
              <TableHeadSortable field="vendorName">Vendor</TableHeadSortable>
              <TableHeadSortable field="date">Date</TableHeadSortable>
              <TableHeadSortable field="price">Price</TableHeadSortable>
              <TableHeadSortable field="status">Status</TableHeadSortable>
              <TableHead className="bg-gray-50 text-gray-700 font-semibold text-xs uppercase tracking-wide">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="text-sm text-gray-700">
                  {booking.serviceDetails.serviceTitle}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {booking.userId.firstName} {booking.userId.lastName}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {booking.vendorId.firstName} {booking.vendorId.lastName}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {moment(booking.bookingDate).format("MMM D, YYYY h:mm A")}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {formatPrice(booking.totalPrice)}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <BookingDetailsModal
                      booking={booking}
                      trigger={
                        <Button size="sm" variant="outline" className="text-xs text-gray-600 border-gray-300">
                          Details
                        </Button>
                      }
                    />
                    {/* Admin-specific action: Approve escrow release */}
                    {booking.isClientApproved && booking.isVendorApproved && booking.status === "completed" && (
                      <Button
                        size="sm"
                        variant="default"
                        className="text-xs bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                          setBookingId(booking._id);
                          setStatus("completed"); // For confirmation purposes
                          setIsConfirmationModalOpen(true);
                        }}
                      >
                        Approve Payment
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={() => {
            onUpdateStatus();
            setBookingId(null);
            setStatus(null);
          }}
          title="Approve Payment Release"
          message="Are you sure you want to approve the payment release to the vendor?"
          confirmText="Yes, Approve"
          cancelText="No, Cancel"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2">
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}