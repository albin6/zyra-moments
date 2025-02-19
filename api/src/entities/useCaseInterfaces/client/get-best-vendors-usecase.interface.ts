import { IVendorEntity } from "../../models/vendor.entity";

export interface IGetBestVendorsUseCase {
  execute(): Promise<Partial<IVendorEntity>[] | []>;
}
