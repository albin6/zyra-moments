import { logout } from "@/services/auth/authService";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
