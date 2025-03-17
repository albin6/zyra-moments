import AdminBookingList from "@/components/admin/AdminBookingList";
import { BookingList } from "@/components/client/ClientBookingList";
import { useBookingQuery } from "@/hooks/booking/useBooking";
import { getClientBookingsInAdmin } from "@/services/booking/bookingServices";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AdminBookingListing() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("Date: Newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const limit = 5;

  const [bookings, setBookings] = useState<BookingList[] | null>(null);

  const { data, isLoading } = useBookingQuery(
    getClientBookingsInAdmin,
    page,
    limit,
    sortBy,
    search,
    statusFilter
  );

  useEffect(() => {
    if (data) {
      setBookings(data.bookings);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    }
  }, [data]);

  if (isLoading) {
    return null;
  }

  if (!bookings) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <AdminBookingList
        bookings={bookings}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalPages={totalPages}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </motion.div>
  );
}
