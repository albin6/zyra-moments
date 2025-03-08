import { clientAxiosInstance } from "@/api/client.axios";

export const getEventAttendance = async (eventId: any) => {
  const response = await clientAxiosInstance.get(
    `/_host/client/events/${eventId}/attendance`
  );
  return response.data;
};
