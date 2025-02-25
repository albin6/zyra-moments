import { BookingList } from "@/components/client/ClientBookingList";
import VendorBookingList from "@/components/vendor/VendorBookingList";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useBookingQuery } from "@/hooks/booking/useBooking";
import { getVendorBookings } from "@/services/booking/bookingServices";
import { Spinner } from "@/components/ui/spinner";

function VendorBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("Date: Newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 1;

  const [bookings, setBookings] = useState<BookingList[] | null>(null);

  const { data, isLoading } = useBookingQuery(
    getVendorBookings,
    page,
    limit,
    sortBy,
    searchQuery,
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
    return <Spinner />;
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
      <VendorBookingList
        bookings={bookings}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        page={page}
        setPage={setPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalPages={totalPages}
      />
    </motion.div>
  );
}

export default VendorBookings;
