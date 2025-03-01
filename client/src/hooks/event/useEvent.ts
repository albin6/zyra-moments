import { AuthResponse } from "@/services/auth/authService";
import { TransformedEventData } from "@/utils/format/transformEventFormData";
import { useMutation } from "@tanstack/react-query";

export const useEventMutation = (
  mutationFunc: (data: TransformedEventData) => Promise<AuthResponse>
) => {
  return useMutation({
    mutationFn: mutationFunc,
  });
};
