import { AxiosResponse, verifyOtp } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

interface Data {
  email: string;
  otp: string;
}

export const useVerifyOTPMutation = () => {
  return useMutation<AxiosResponse, Error, Data>({
    mutationFn: verifyOtp,
  });
};
