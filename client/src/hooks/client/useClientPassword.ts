import { AxiosResponse } from "@/services/auth/authService";
import { updateClientPassword } from "@/services/client/clientService";
import { useMutation } from "@tanstack/react-query";

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const useClientPasswordUpdateMutation = () => {
  return useMutation<AxiosResponse, Error, UpdatePasswordData>({
    mutationFn: updateClientPassword,
  });
};
