import { motion } from "framer-motion";
import AdminBookingList from "@/components/admin/AdminBookingList";

export function AdminBookingListing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <AdminBookingList />
    </motion.div>
  );
}
