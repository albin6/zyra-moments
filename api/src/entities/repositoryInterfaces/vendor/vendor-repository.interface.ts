import { ObjectId } from "mongoose";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IVendorRepository {
  save(data: Partial<IVendorEntity>): Promise<IVendorEntity>;

  findByEmail(email: string): Promise<IVendorEntity | null>;

  findByIdAndUpdateVendorCategory(
    vendorId: any,
    categoryId: any
  ): Promise<IVendorEntity | null>;

  findById(id: any): Promise<IVendorEntity | null>;

  findByIdForPasswordUpdate(id: any): Promise<IVendorEntity | null>;

  find(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ user: IVendorEntity[] | []; total: number }>;

  findByIdAndUpdatePassword(id: any, password: string): Promise<void>;

  findByIdAndUpdateStatus(id: any, status: string): Promise<void>;

  updateVendorProfileById(
    id: string,
    data: Partial<IVendorEntity>
  ): Promise<void>;

  findByCategoryId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<{ vendors: IVendorEntity[] | []; total: number }>;
}
