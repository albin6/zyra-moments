import { ICategoryRequestEntity } from "../../models/category-request.entity";

export interface ICategoryRequestRepository {
  save(vendorId: string, categoryId: string): Promise<ICategoryRequestEntity>;
  findByVendorAndCategory(
    vendorId: string,
    categoryId: string
  ): Promise<ICategoryRequestEntity | null>;
}
