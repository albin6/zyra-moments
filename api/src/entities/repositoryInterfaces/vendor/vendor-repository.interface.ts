import { IVendorEntity } from "../../models/vendor.entity";

export interface IVendorRepository {
  save(data: Partial<IVendorEntity>): Promise<IVendorEntity>;
  findByEmail(email: string): Promise<IVendorEntity | null>;
}
