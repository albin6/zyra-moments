import { PaginatedServices } from "../../../models/paginated-services.entity";

export interface IGetAllServicesByVendorIdUseCase {
  execute(
    id: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedServices>;
}
