import { clientAxiosInstance } from "@/api/client.axios";

export const downloadTicketAsPdf = async (ticketId: string) => {
  const response = await clientAxiosInstance.get<Blob>(
    `/_qr/client/${ticketId}/download-pdf`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};
