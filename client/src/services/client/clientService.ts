import { clientAxiosInstance } from "@/api/client.axios";
import { UpdatePasswordData } from "@/hooks/client/useClientPassword";
import { AxiosResponse } from "../auth/authService";

export type Client = {
  _id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  masterOfCeremonies: boolean;
  profileImage?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ClientResponse = {
  success: boolean;
  client: Client;
};

export const getClientDetails = async () => {
  const response = await clientAxiosInstance.get<ClientResponse>(
    "/_cl/client/details"
  );
  return response.data;
};

export interface IUpdateClientData
  extends Pick<
    Client,
    "firstName" | "lastName" | "phoneNumber" | "profileImage"
  > {}

export const updateClientProfile = async (data: IUpdateClientData) => {
  const response = await clientAxiosInstance.put("/_cl/client/details", data);
  return response.data;
};

export const updateClientPassword = async ({
  currentPassword,
  newPassword,
}: UpdatePasswordData) => {
  const response = await clientAxiosInstance.put<AxiosResponse>(
    "/_cl/client/update-password",
    {
      currentPassword,
      newPassword,
    }
  );
  return response.data;
};
