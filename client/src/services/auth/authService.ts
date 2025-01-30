import { authAxiosInstance } from "@/api/auth.axios";
import { UserDTO } from "@/types/User";

export interface AuthResponse {
  success: boolean;
  message: string;
}

export const signup = async (user: UserDTO): Promise<AuthResponse> => {
  const response = await authAxiosInstance.post<AuthResponse>(
    "/register",
    user
  );
  return response.data;
};
