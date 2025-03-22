import { clientAxiosInstance } from "@/api/client.axios";
import { AxiosResponse } from "../auth/authService";
import { adminAxiosInstance } from "@/api/admin.axios";

export interface FundReleaseRequest {
  requestId: string;
  eventId: string;
  organizerId: string;
  totalAmount: number;
  ticketSalesCount: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "RELEASED";
  requestedAt: string;
  processedAt?: string;
  adminNotes?: string;
}

// Define the FundReleaseRequest type
export interface FundReleaseRequestResponse {
  requestId: string;
  eventId: {
    title: string;
  };
  totalAmount: number;
  ticketSalesCount: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
}


export const createFundReleaseRequest = async (data: FundReleaseRequest) => {
  const response = await clientAxiosInstance.post<AxiosResponse>(
    "/_cl/client/fund-release",
    data
  );
  return response.data;
};

export const getAllFundReleaseRequest = async (): Promise<{success: boolean, data: FundReleaseRequestResponse[]}> => {
  const response = await adminAxiosInstance.get("/_ad/admin/fund-release");
  return response.data;
};

export const updateFundReleaseRequestStatus = async (
  data: FundReleaseRequest
) => {
  const response = await adminAxiosInstance.patch(
    `/_ad/admin/fund-release/${data.requestId}`,
    {
      status: data.status
    }
  );
  return response.data;
};
