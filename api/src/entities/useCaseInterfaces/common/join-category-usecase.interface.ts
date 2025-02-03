import { ObjectId } from "mongoose";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IJoinCategoryUseCase {
  execute(
    vendorId: ObjectId,
    categoryId: ObjectId
  ): Promise<IVendorEntity | null>;
}
