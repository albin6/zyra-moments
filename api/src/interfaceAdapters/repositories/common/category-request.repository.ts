import { ICategoryRequestEntity } from "../../../entities/models/category-request.entity";
import { ICategoryRequestRepository } from "../../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { CategoryRequestModel } from "../../../frameworks/database/models/category-request.model";

export class CategoryRequestRepository implements ICategoryRequestRepository {
  async save(
    vendorId: string,
    categoryId: string
  ): Promise<ICategoryRequestEntity> {
    return await CategoryRequestModel.create({ vendorId, categoryId });
  }

  async findByVendorAndCategory(
    vendorId: string,
    categoryId: string
  ): Promise<ICategoryRequestEntity | null> {
    return await CategoryRequestModel.findOne({ vendorId, categoryId });
  }
}
