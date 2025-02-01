import { AxiosResponse, sendOtp } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

export const useSendOTPMutation = () => {
  return useMutation<AxiosResponse, Error, string>({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      console.log("Otp sent successfully", data);
    },
    onError: (error) => {
      console.error("Error while sending otp:", error.message);
    },
  });
};
