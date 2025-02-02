import { authAxiosInstance } from "@/api/auth.axios";
import { UserDTO } from "@/types/User";

export interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "client" | "admin" | "vendor";
  };
}

export interface AxiosResponse {
  success: boolean;
  message: string;
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

export const sendOtp = async (email: string): Promise<AxiosResponse> => {
  const response = await authAxiosInstance.post<AxiosResponse>("/send-otp", {
    email,
  });
  return response.data;
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const response = await authAxiosInstance.post<AxiosResponse>(
    "/verify-otp",
    data
  );
  return response.data;
};

export const logout = async (): Promise<AxiosResponse> => {
  const response = await authAxiosInstance.post("/logout");
  return response.data;
};
