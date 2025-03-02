import { Purpose } from "@/services/payment/paymentService";
import { useMutation } from "@tanstack/react-query";
import { PaymentResponse } from "@/services/payment/paymentService";
import { Booking } from "@/types/Booking";

export const useVendorBookingPaymentMutation = (
  mutationFunc: (data: {
    amount: number;
    purpose: Purpose;
    bookingData: Booking;
  }) => Promise<PaymentResponse>
) => {
  return useMutation({
    mutationFn: mutationFunc,
  });
};

export const useRolePromoPaymentMutation = (
  mutationFunc: (data: {
    amount: number;
    purpose: Purpose;
  }) => Promise<PaymentResponse>
) => {
  return useMutation({
    mutationFn: mutationFunc,
  });
};
