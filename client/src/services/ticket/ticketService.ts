import { clientAxiosInstance } from "@/api/client.axios";
import { AxiosResponse } from "../auth/authService";

export const downloadTicketAsPdf = async (ticketId: string) => {
  const response = await clientAxiosInstance.get<Blob>(
    `/_qr/client/${ticketId}/download-pdf`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

export const markAttendance = async (data: {
  qrCode: string;
}): Promise<AxiosResponse> => {
  const response = await clientAxiosInstance.put("/_qr/client/ticket", {
    qrCode: data.qrCode,
  });
  return response.data;
};

export interface PopulatedTicket {
  _id: any;
  ticketId: string;
  userId: any;
  eventId: {
    _id: any;
    title: string;
    description: string;
    date: Date;
    pricePerTicket: number;
    ticketLimit: number;
    eventLocation: string;
    startTime: string;
    endTime: string;
  };
  qrCode: string;
  isScanned: boolean;
  status: "PURCHASED" | "USED" | "CANCELLED";
}

interface PaginatedTicketByUser {
  success: boolean;
  tickets: PopulatedTicket[];
  totalPages: number;
  currentPage: number;
}

export const getAllPurchasedTickets = async (
  page: number,
  limit: number
): Promise<PaginatedTicketByUser> => {
  const response = await clientAxiosInstance.get(
    "/_host/client/purchased-tickets",
    {
      params: {
        page,
        limit,
      },
    }
  );
  return response.data;
};

export const cancelTicket = async (data: { ticketId: string }) => {
  const response = await clientAxiosInstance.patch(
    "/_host/client/ticket/cancel",
    {},
    { params: { ticketId: data.ticketId } }
  );
  return response.data;
};
