import { AuthResponse, signup } from "@/services/auth/authService";
import { UserDTO } from "@/types/User";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  return useMutation<AuthResponse, Error, UserDTO>({
    mutationFn: signup,
  });
};
