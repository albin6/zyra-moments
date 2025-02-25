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
  bookingDate: string;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  __v: number;
  paymentId: string;
}

interface ClientBookingListProps {
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

const STATUS_COLORS = {
  confirmed: "bg-success/10 text-success hover:bg-success/20",
  pending: "bg-warning/10 text-warning hover:bg-warning/20",
  cancelled: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  default: "bg-muted/50 text-muted-foreground hover:bg-muted",
} as const;

export default function ClientBookingList({
  bookings,
  page,
  setPage,
  totalPages,
  sortBy,
  setSortBy,
  search,
  setSearch,
}: ClientBookingListProps) {
  const handleSort = (field: string) => {
    setSortBy(
      sortBy === field ? `-${field}` : sortBy === `-${field}` ? "" : field
    );
  };

  const getStatusColor = (status: string) => {
    return (
      STATUS_COLORS[status.toLowerCase() as keyof typeof STATUS_COLORS] ||
      STATUS_COLORS.default
    );
  };

  const getSortIcon = (field: string) => {
    if (sortBy === field) return <ChevronUp className="w-4 h-4" />;
    if (sortBy === `-${field}`) return <ChevronDown className="w-4 h-4" />;
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
      className="cursor-pointer hover:bg-accent transition-colors"
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <span className="w-4">{getSortIcon(field)}</span>
      </div>
    </TableHead>
  );

  const BookingCard = ({ booking }: { booking: BookingList }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{booking.serviceDetails.serviceTitle}</span>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Client:</span>
          <span className="text-right font-medium">
            {booking.vendorId.firstName + " " + booking.vendorId.lastName}
          </span>
          <span className="text-muted-foreground">Date:</span>
          <span className="text-right font-medium">
            {moment(booking.bookingDate).format("LLL")}
          </span>
          <span className="text-muted-foreground">Price:</span>
          <span className="text-right font-medium">
            {formatPrice(booking.totalPrice)}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadSortable field="serviceRequired">
                Service
              </TableHeadSortable>
              <TableHeadSortable field="clientName">
                Vendor Name
              </TableHeadSortable>
              <TableHeadSortable field="date">Date</TableHeadSortable>
              <TableHeadSortable field="price">Price</TableHeadSortable>
              <TableHeadSortable field="status">Status</TableHeadSortable>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking._id}
                className="hover:bg-accent cursor-pointer"
              >
                <TableCell className="font-medium">
                  {booking.serviceDetails.serviceTitle}
                </TableCell>
                <TableCell>
                  {booking.vendorId.firstName + " " + booking.vendorId.lastName}
                </TableCell>
                <TableCell>
                  {moment(booking.bookingDate).format("LLL")}
                </TableCell>
                <TableCell>{formatPrice(booking.totalPrice)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
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
