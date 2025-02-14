import { ObjectId } from "mongoose";

export interface IJoinCategoryRequestUseCase {
  execute(vendorId: ObjectId, categoryId: ObjectId): Promise<void>;
}
