import { AxiosResponse } from "@/services/auth/authService";
import {
  getClientDetails,
  IUpdateClientData,
  updateClientProfile,
} from "@/services/client/clientService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClientProfileQuery = () => {
  return useQuery({
    queryKey: ["client-profile"],
    queryFn: getClientDetails,
  });
};

export const useClientProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, Error, IUpdateClientData>({
    mutationFn: updateClientProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["client-profile"] }),
  });
};
