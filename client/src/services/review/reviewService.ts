import { clientAxiosInstance } from "@/api/client.axios";
import { vendorAxiosInstance } from "@/api/vendor.axios";

export interface ICreateReview {
  vendorId: string;
  rating: number;
  comment: string;
  bookingId: string;
}


interface TimeSlot {
  startTime: string
  endTime: string
}

interface ServiceDetails {
  serviceTitle: string
  serviceDescription: string
  serviceDuration: number
  servicePrice: number
  additionalHoursPrice: number
  cancellationPolicies: string[]
  termsAndConditions: string[]
}

interface IBookingEntity {
  _id?: string
  userId?: string
  vendorId?: string
  paymentId?: string
  isClientApproved: boolean
  isVendorApproved: boolean
  serviceDetails: ServiceDetails
  bookingDate: string
  timeSlot: TimeSlot
  totalPrice: number
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: Date
}

interface IUserEntity {
  _id?: string
  firstName?: string
  lastName?: string
  email: string
  password: string
  googleId: string
  role: string
  profileImage?: string
  phoneNumber?: string
  masterOfCeremonies?: boolean
  onlineStatus?: "online" | "offline"
  lastStatusUpdated: Date
  status?: string
  createdAt: Date
  updatedAt: Date
}

interface IClientEntity extends IUserEntity {}
interface IVendorEntity extends IUserEntity {}

export interface PopulatedReview {
  bookingId: IBookingEntity
  reviewId: string
  clientId: IClientEntity
  vendorId: IVendorEntity
  rating: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

export interface ReviewsResponse {
  success: boolean
  reviews: PopulatedReview[]
  totalPages: number
  currentPage: number
}

export const createNewReview = async (data: ICreateReview) => {
  const response = await clientAxiosInstance.post("/_cl/client/review", data);
  return response.data;
};

export const clientGetAllReviewsByVendorId = async (data: {
  page: number;
  limit: number;
  sort: string;
  vendorId: string
}) => {
  const response = await clientAxiosInstance.get("/_cl/client/reviews", {
    params: {
      page: data.page,
      limit: data.limit,
      sort: data.sort,
      vendorId: data.vendorId
    },
  });
  return response.data;
};


export const vendorGetAllReviewsByVendorId = async (data: {
  page: number;
  limit: number;
  sort: string;
  vendorId: string
}) => {
  const response = await vendorAxiosInstance.get("/_ve/vendor/reviews", {
    params: {
      page: data.page,
      limit: data.limit,
      sort: data.sort,
      vendorId: data.vendorId
    },
  });
  return response.data;
};
