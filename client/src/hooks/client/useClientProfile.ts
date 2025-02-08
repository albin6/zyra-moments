import { getClientDetails } from "@/services/client/clientService";
import { useQuery } from "@tanstack/react-query";

export const useClientProfileQuery = () => {
  return useQuery({
    queryKey: ["clientProfile"],
    queryFn: getClientDetails,
  });
};
