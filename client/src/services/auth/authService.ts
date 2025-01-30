import { authAxiosInstance } from "@/api/auth.axios";
import { UserDTO } from "@/types/User";

export interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    role: "client" | "admin" | "vendor";
  };
}

export interface ILoginData {
  email: string;
  password: string;
  role: "admin" | "client" | "vendor";
}

export const signup = async (user: UserDTO): Promise<AuthResponse> => {
  const response = await authAxiosInstance.post<AuthResponse>(
    "/register",
    user
  );
  return response.data;
};

export const login = async (user: ILoginData): Promise<AuthResponse> => {
  const response = await authAxiosInstance.post<AuthResponse>("/login", user);
  return response.data;
};
