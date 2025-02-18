import { VendorListing } from "@/components/client/VendorListing";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export function ClientVendorListing() {
  const { categoryId } = useParams();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <VendorListing />
      </div>
    </motion.div>
  );
}
