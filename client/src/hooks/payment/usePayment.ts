import { Purpose } from "@/services/payment/paymentService";
import { useMutation } from "@tanstack/react-query";
import { PaymentResponse } from "@/services/payment/paymentService";

export const usePaymentMutation = (
  mutationFunc: (data: {
    amount: number;
    purpose: Purpose;
  }) => Promise<PaymentResponse>
) => {
  return useMutation({
    mutationFn: mutationFunc,
  });
};
