import { BookingList } from "@/components/client/ClientBookingList";
import { useAdminBookingQuery } from "@/hooks/booking/useBooking";
import { getClientBookingsInAdmin } from "@/services/booking/bookingServices";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminBookingList from "@/components/admin/AdminBookingList";

export function AdminBookingManagement() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("Date: Newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const limit = 5;

  const [bookings, setBookings] = useState<BookingList[] | null>(null);

  const { data, isLoading } = useAdminBookingQuery(
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
        search={search}
        setPage={setPage}
        setSearch={setSearch}
        setSortBy={setSortBy}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        statusFilter={statusFilter}
        totalPages={totalPages}
      />
    </motion.div>
  );
}
