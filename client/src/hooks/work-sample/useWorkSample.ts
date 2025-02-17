import { IResponse } from "@/types/Response";
import { WorkSample } from "@/types/WorkSample";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface FetchWorkSampleParams {
  page: number;
  limit: number;
}

export type WorkSampleResponse = {
  workSamples: WorkSample[];
  totalPages: number;
  currentPage: number;
};

export const useWorkSampleQuery = (
  queryFunc: (params: FetchWorkSampleParams) => Promise<WorkSampleResponse>,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["work-sample", page, limit],
    queryFn: () => queryFunc({ page, limit }),
  });
};

export interface SingleWorkSampleResponse {
  success: boolean;
  workSample: WorkSample;
}

export const useSingleWorkSampleQuery = (
  queryFunc: (id: string) => Promise<SingleWorkSampleResponse>,
  id: string
) => {
  return useQuery({
    queryKey: ["single-work-sample"],
    queryFn: () => queryFunc(id),
  });
};

export const useWorkSampleMutation = (mutationFunc: any) => {
  const queryClient = useQueryClient();
  return useMutation<IResponse, Error, any>({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["work-sample"] });
      queryClient.invalidateQueries({ queryKey: ["single-work-sample"] });
    },
  });
};
