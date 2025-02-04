import { AuthResponse, ILoginData, login } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation<AuthResponse, Error, ILoginData>({
    mutationFn: login,
  });
};
