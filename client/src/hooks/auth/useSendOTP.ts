import { AxiosResponse, sendOtp } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

export const useSendOTPMutation = () => {
  return useMutation<AxiosResponse, Error, string>({
    mutationFn: sendOtp,
  });
};
