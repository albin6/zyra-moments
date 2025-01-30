import { VendorDTO } from "../../../shared/dtos/user.dto";
import { IVendorEntity } from "../../models/vendor.entity";

export interface IVendorRepository {
  save(data: VendorDTO): Promise<IVendorEntity>;
  findByEmail(email: string): Promise<IVendorEntity | null>;
}
