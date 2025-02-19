import VendorBooking from "@/components/client/VendorBooking";
import { motion } from "framer-motion";

function ClientVendorBooking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <VendorBooking />
      </div>
    </motion.div>
  );
}

export default ClientVendorBooking;
