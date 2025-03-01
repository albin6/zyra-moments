import EventPlatform from "@/components/client/event-hosting/EventPlatform";
import { motion } from "framer-motion";

function HostEventFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <EventPlatform />
    </motion.div>
  );
}

export default HostEventFlow;
