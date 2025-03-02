"use client";

import type React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  userName = "User",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-primary/10 shadow-lg">
          <CardHeader className="relative pb-2">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2l1.6 4.3a1 1 0 0 0 .7.6l4.4.4a1 1 0 0 1 .5 1.7l-3.3 2.8a1 1 0 0 0-.3.9l1 4.3a1 1 0 0 1-1.5 1.1L11 16a1 1 0 0 0-.9 0l-4.1 2.1a1 1 0 0 1-1.5-1.1l1-4.3a1 1 0 0 0-.3-.9l-3.3-2.8a1 1 0 0 1 .5-1.7l4.4-.4a1 1 0 0 0 .7-.6L9 2a1 1 0 0 1 3 0z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-center text-xl sm:text-2xl">
              Congratulations!
            </CardTitle>
            <CardDescription className="text-center pt-1">
              You've been promoted to
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center px-6">
            <Badge className="text-md px-3 py-1.5 mb-4 bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
              Master of Ceremonies
            </Badge>
            <p className="text-muted-foreground mb-4">
              Dear {userName}, we're thrilled to announce your promotion! You
              now have the ability to host and manage events on our platform.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-muted rounded-lg p-3">
                <h4 className="font-medium mb-1">Create Events</h4>
                <p className="text-muted-foreground text-xs">
                  Design and schedule new events
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <h4 className="font-medium mb-1">Manage Attendees</h4>
                <p className="text-muted-foreground text-xs">
                  Invite and organize participants
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <h4 className="font-medium mb-1">Custom Themes</h4>
                <p className="text-muted-foreground text-xs">
                  Personalize event appearances
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <h4 className="font-medium mb-1">Analytics</h4>
                <p className="text-muted-foreground text-xs">
                  Track event performance
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6 pt-2">
            <Button onClick={onClose} className="px-8">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
