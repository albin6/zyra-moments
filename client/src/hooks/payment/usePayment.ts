import { Purpose } from "@/services/payment/paymentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PaymentResponse } from "@/services/payment/paymentService";
import { Booking } from "@/types/Booking";

export const useVendorBookingPaymentMutation = (
  mutationFunc: (data: {
    amount: number;
    purpose: Purpose;
    bookingData: Booking;
    createrType: string;
    receiverType: string;
  }) => Promise<PaymentResponse>
) => {
  return useMutation({
    mutationFn: mutationFunc,
  });
};

export const useRolePromoOrTicketBookingPaymentMutation = (
  mutationFunc: (data: {
    amount: number;
    purpose: Purpose;
  }) => Promise<PaymentResponse>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-profile"] });
    },
  });
};
