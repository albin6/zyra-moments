import { AuthResponse, signup } from "@/services/auth/authService";
import { UserDTO } from "@/types/User";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  return useMutation<AuthResponse, Error, UserDTO>({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Registered successfully", data);
    },
    onError: (error) => {
      console.error("Registration Error:", error.message);
    },
  });
};
