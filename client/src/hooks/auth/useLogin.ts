import { AuthResponse, ILoginData, login } from "@/services/auth/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthResponse, Error, ILoginData>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Logged successfully", data);
      queryClient.invalidateQueries({ queryKey: "requestedOrNot" });
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};
