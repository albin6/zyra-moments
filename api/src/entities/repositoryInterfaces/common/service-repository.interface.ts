import { PaginatedServices } from "../../models/paginated-services.entity";
import { IServiceEntity } from "../../models/service.entity";

export interface IServiceRepository {
  save(data: IServiceEntity): Promise<void>;

  findByVendorId(
    id: any,
    skip: number,
    limit: number
  ): Promise<PaginatedServices>;

  findById(id: any): Promise<IServiceEntity | null>;

  findByIdAndUpdate(id: any, data: IServiceEntity): Promise<void>;
}
