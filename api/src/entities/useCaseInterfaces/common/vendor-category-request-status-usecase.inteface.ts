import { IVendorEntity } from "../../models/vendor.entity";

export interface IVendorCategoryRequestStatusUseCase {
  execute(vendorId: any): Promise<void>;
}
