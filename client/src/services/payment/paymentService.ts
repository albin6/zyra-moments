import { clientAxiosInstance } from "@/api/client.axios";

export type Purpose = "vendor-booking" | "role-upgrade" | "ticket-purchase";

export interface PaymentResponse {
  success: true;
  clientSecret: string;
  message: string;
}

export const makePayment = async (data: {
  amount: number;
  purpose: Purpose;
}): Promise<PaymentResponse> => {
  const response = await clientAxiosInstance.post(
    "/_pmt/client/create-payment-intent",
    {
      amount: data.amount,
      purpose: data.purpose,
    }
  );
  return response.data;
};
