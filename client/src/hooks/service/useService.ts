import { SingleServiceResponse } from "@/services/vendor/service";
import { IResponse } from "@/types/Response";
import { Service } from "@/types/Service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FetchServiceParams {
  page: number;
  limit: number;
}

export type ServicesResponse = {
  services: Service[];
  totalPages: number;
  currentPage: number;
};

export const useServiceQuery = (
  queryFunc: (params: FetchServiceParams) => Promise<ServicesResponse>,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["services", page, limit],
    queryFn: () => queryFunc({ page, limit }),
  });
};

export const useSingleServiceQuery = (
  queryFunc: (id: any) => Promise<SingleServiceResponse>,
  id: any
) => {
  return useQuery({
    queryKey: ["single-service"],
    queryFn: () => queryFunc(id),
  });
};

export const useServiceMutation = (mutationFunc: any) => {
  const queryClient = useQueryClient();
  return useMutation<IResponse, Error, any>({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
