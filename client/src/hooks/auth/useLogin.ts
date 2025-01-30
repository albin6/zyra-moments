import { AuthResponse, ILoginData, login } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation<AuthResponse, Error, ILoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Logged successfully", data);
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};
