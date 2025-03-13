import { clientAxiosInstance } from "@/api/client.axios";
import { Service } from "@/types/Service";
import { WorkSample } from "@/types/WorkSample";

export interface VendorProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  phoneNumber?: string;
  status: string;
  canChat: boolean
  vendorId: string;
  category?: {
    _id: string;
    title: string;
  };
  bio: string;
  place: string;
  averageRating: number;
  totalReviews: number;
  workSamples: WorkSample[];
  services: Service[];
}

export interface VendorProfileResponse {
  success: boolean;
  vendorData: VendorProfileData;
  currentServicePage: number;
  totalServicePages: number;
  currentWorkSamplePage: number;
  totalWorkSamplePage: number;
}

export const getVendorProfileDetailsForClientSide = async (
  vendorId: string,
  currentServicePage: number,
  currentWorkSamplePage: number,
  limit: number
): Promise<VendorProfileResponse> => {
  const response = await clientAxiosInstance.get(
    `/_cl/client/${vendorId}/details`,
    {
      params: {
        servicePage: currentServicePage,
        workSamplePage: currentWorkSamplePage,
        limit,
      },
    }
  );
  return response.data;
};
