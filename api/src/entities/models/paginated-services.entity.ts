import { IServiceEntity } from "./service.entity";

export interface PaginatedServices {
  services:
    | Pick<
        IServiceEntity,
        | "_id"
        | "serviceTitle"
        | "serviceDescription"
        | "servicePrice"
        | "serviceDuration"
      >[]
    | [];
  total: number;
  all: number;
}

export interface PaginatedVendorServices {
  services: IServiceEntity[] | [];
  total: number;
}
