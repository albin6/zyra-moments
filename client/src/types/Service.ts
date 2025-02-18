export interface TimeSlot {
  startTime: string;
  endTime: string;
  capacity: number;
}

export interface DateSlot {
  date: string;
  timeSlots: TimeSlot[];
}

export interface Service {
  _id?: string;
  vendorId?: string;
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
