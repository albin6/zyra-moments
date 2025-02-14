import { IVendorEntity } from "../../models/vendor.entity";

export interface IUpdateVendorProfileUseCase {
  execute(vendorId: string, data: Partial<IVendorEntity>): Promise<void>;
}
