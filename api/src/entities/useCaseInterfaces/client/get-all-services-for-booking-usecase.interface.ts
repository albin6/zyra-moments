import { IServiceEntity } from "../../models/service.entity";

export interface IGetAllServicesForBookingUseCase {
  execute(id: any): Promise<IServiceEntity[] | []>;
}
