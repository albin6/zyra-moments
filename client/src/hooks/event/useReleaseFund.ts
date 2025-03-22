import { AxiosResponse } from "@/services/auth/authService";
import { getAllFundReleaseRequest } from "@/services/event/fundReleaseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useReleaseFundQuery = () => {
  return useQuery({
    queryKey: ["release-fund"],
    queryFn: () => getAllFundReleaseRequest(),
  });
};

export const useFundReleaseMutation = (
  mutationFunc: (data: any) => Promise<AxiosResponse>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["release-fund"] });
    },
  });
};
