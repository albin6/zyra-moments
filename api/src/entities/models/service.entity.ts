import { ObjectId } from "mongoose";

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
