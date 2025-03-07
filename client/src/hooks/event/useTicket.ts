import { AxiosResponse } from "@/services/auth/authService";
import { markAttendance } from "@/services/ticket/ticketService";
import { useMutation } from "@tanstack/react-query";

type MarkAttendanceParams = {
  qrCode: string;
};

export const useTicketMutation = () => {
  return useMutation<AxiosResponse, Error, MarkAttendanceParams>({
    mutationFn: markAttendance,
  });
};
