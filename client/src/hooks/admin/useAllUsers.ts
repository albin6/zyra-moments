import { ClientsData, VendorList } from "@/components/admin/UserManagement";
import { useQuery } from "@tanstack/react-query";

export type UserType = "client" | "vendor";

interface FetchUsersParams {
  userType: UserType;
  page: number;
  limit: number;
  search: string;
}

type UsersResponse<T> = {
  users: T;
  totalPages: number;
  currentPage: number;
};

export const useAllUsersQuery = <T extends ClientsData | VendorList>(
  queryFunc: (params: FetchUsersParams) => Promise<UsersResponse<T>>,
  page: number,
  limit: number,
  search: string,
  userType: UserType
) => {
  return useQuery({
    queryKey: ["users", userType, page, limit, search],
    queryFn: () => queryFunc({ userType, page, limit, search }),
    placeholderData: (prevData) => prevData,
  });
};
