import { IVendorEntity } from "../../models/vendor.entity";

export interface IGetVendorDetailsUseCase {
  execute(vendorId: any): Promise<IVendorEntity | null>;
}
