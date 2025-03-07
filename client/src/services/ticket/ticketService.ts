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
