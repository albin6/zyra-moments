import { ObjectId, Types } from "mongoose";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IVendorRepository {
  save(data: Partial<IVendorEntity>): Promise<IVendorEntity>;
  findByEmail(email: string): Promise<IVendorEntity | null>;
  findByIdAndUpdate(
    vendorId: ObjectId,
    categoryId: ObjectId
  ): Promise<IVendorEntity | null>;
  findById(id: any): Promise<IVendorEntity | null>;
  find(): Promise<IVendorEntity[] | []>;
}
