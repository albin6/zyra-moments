import { ObjectId } from "mongoose";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IJoinCategoryRequestUseCase {
  execute(vendorId: ObjectId, categoryId: ObjectId): Promise<void>;
}
