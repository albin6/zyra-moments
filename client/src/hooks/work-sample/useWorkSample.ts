import { IResponse } from "@/types/Response";
import { WorkSample } from "@/types/WorkSample";
import { useMutation } from "@tanstack/react-query";

export const useWorkSampleMutation = (mutationFunc: any) => {
  return useMutation<IResponse, Error, WorkSample>({
    mutationFn: mutationFunc,
    onSuccess: () => console.log("success"),
  });
};
