import { motion } from "framer-motion";
import { EventListing } from "@/components/client/EventListing";

export function ClientEventListing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <EventListing />
      </div>
    </motion.div>
  );
}
