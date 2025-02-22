import React from "react";
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

export interface BookingList {
  _id: string;
  clientName: string;
  serviceRequired: string;
  requiredDate: string;
  totalPrice: number;
  status: string;
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
}

const STATUS_COLORS = {
  confirmed: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  default: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
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
      className="cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <span className="w-4">{getSortIcon(field)}</span>
      </div>
    </TableHead>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const BookingCard = ({ booking }: { booking: BookingList }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{booking.serviceRequired}</span>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Client:</span>
          <span className="text-right font-medium">{booking.clientName}</span>
          <span className="text-muted-foreground">Date:</span>
          <span className="text-right font-medium">
            {formatDate(booking.requiredDate)}
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
                Client Name
              </TableHeadSortable>
              <TableHeadSortable field="date">Date</TableHeadSortable>
              <TableHeadSortable field="price">Price</TableHeadSortable>
              <TableHeadSortable field="status">Status</TableHeadSortable>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {booking.serviceRequired}
                </TableCell>
                <TableCell>{booking.clientName}</TableCell>
                <TableCell>{formatDate(booking.requiredDate)}</TableCell>
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
