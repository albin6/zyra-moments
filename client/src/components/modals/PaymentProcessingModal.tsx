import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface PaymentProcessingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSuccess?: boolean;
}

export default function PaymentProcessingModal({
  isOpen,
  onOpenChange,
  isSuccess = false,
}: PaymentProcessingModalProps) {
  const [progress, setProgress] = React.useState(0);

  // Simulate progress
  React.useEffect(() => {
    if (isOpen && !isSuccess) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 600);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen, isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md z-[1000]">
        <DialogHeader>
          <DialogTitle className="text-center">Processing Payment</DialogTitle>
          <DialogDescription className="text-center">
            Please wait while we process your payment for the event.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-8 py-8">
          {!isSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              {/* <motion.div
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              /> */}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-primary"
            >
              <CheckCircle2 className="h-12 w-12" />
            </motion.div>
          )}
          <div className="w-full space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
              {isSuccess
                ? "Payment successful! Redirecting..."
                : "Please don't close this window"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
