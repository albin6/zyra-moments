import { clientAxiosInstance } from "@/api/client.axios";
import { TransformedEventData } from "@/utils/format/transformEventFormData";

export const hostNewEvent = async (data: TransformedEventData) => {
  const response = await clientAxiosInstance.post(
    "/_host/client/host-event",
    data
  );
  return response.data;
};
