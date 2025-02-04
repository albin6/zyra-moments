import { useQuery } from "@tanstack/react-query";

export const useAllUsersQuery = (queryFunc: any, userType: string) => {
  return useQuery({
    queryKey: ["users", userType],
    queryFn: () => queryFunc(userType),
  });
};
