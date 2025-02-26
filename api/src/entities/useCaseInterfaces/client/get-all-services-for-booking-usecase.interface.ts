import {
  IServiceEntity,
  ServiceVendorReturn,
} from "../../models/service.entity";

export interface IGetAllServicesForBookingUseCase {
  execute(id: any): Promise<ServiceVendorReturn>;
}
