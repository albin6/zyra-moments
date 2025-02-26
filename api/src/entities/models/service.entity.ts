import { ObjectId } from "mongoose";
import { IVendorEntity } from "./vendor.entity";

interface TimeSlot {
  startTime: string;
  endTime: string;
  capacity: number;
}

interface DateSlot {
  date: string;
  timeSlots: TimeSlot[];
}

export interface IServiceEntity {
  _id?: string | ObjectId;
  vendorId?: string | ObjectId;
  serviceTitle: string;
  yearsOfExperience: number;
  availableDates: DateSlot[];
  serviceDescription: string;
  serviceDuration: number;
  servicePrice: number;
  additionalHoursPrice: number;
  cancellationPolicies: string[];
  termsAndConditions: string[];
}

export interface ServiceForBooking extends Omit<IServiceEntity, "vendorId"> {
  vendorId: {
    _id: string | ObjectId;
    firstName: string;
    lastName: string;
    place: string;
    averageRating: number;
    category: {
      _id: string | ObjectId;
      title: string;
    };
  };
  _id: string | ObjectId;
  __v?: number;
}

export interface ServiceVendorReturn {
  services: IServiceEntity[] | [];
  vendor: IVendorEntity;
}
