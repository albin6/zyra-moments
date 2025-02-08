import { AxiosResponse } from "@/services/auth/authService";
import { updateVendorPassword } from "@/services/vendor/vendorService";
import { useMutation } from "@tanstack/react-query";
import { UpdatePasswordData } from "../client/useClientPassword";

export const useVendorPasswordUpdateMutation = () => {
  return useMutation<AxiosResponse, Error, UpdatePasswordData>({
    mutationFn: updateVendorPassword,
  });
};
