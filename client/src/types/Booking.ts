export interface Booking {
  vendorId: string;

  serviceId: string;

  bookingDate: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };

  totalPrice: number;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  status: "confirmed" | "cancelled" | "completed";
}
