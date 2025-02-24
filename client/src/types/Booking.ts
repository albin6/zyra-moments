export interface Booking {
  vendorId: string;

  serviceId: string;

  bookingDate: Date;
  timeSlot: {
    startTime: string;
    endTime: string;
  };

  totalPrice: number;
}
