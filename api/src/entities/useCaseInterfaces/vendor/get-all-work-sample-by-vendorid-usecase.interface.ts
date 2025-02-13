import { PaginatedWorkSample } from "../../models/paginated-work-sample.entity";

export interface IGetAllWorkSampleByVendorIdUseCase {
  execute(
    vendorId: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedWorkSample>;
}
