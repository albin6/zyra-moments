import { AxiosResponse } from "@/services/auth/authService";
import { cancelTicket, getAllPurchasedTickets, markAttendance } from "@/services/ticket/ticketService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type MarkAttendanceParams = {
  qrCode: string;
};

export const useTicketMutation = () => {
  return useMutation<AxiosResponse, Error, MarkAttendanceParams>({
    mutationFn: markAttendance,
  });
};

export const useTicketByUserQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['purchased-tickets', page, limit], 
    queryFn: () => getAllPurchasedTickets(page, limit) 
  })
}

export const useTicket = () => {
  const queryClient = useQueryClient()
  return useMutation<AxiosResponse, Error, {ticketId: string}>({
    mutationFn: cancelTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['purchased-tickets']})
    }
  })
}