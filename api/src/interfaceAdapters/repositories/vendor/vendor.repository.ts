import { injectable } from "tsyringe";
import { IVendorEntity } from "../../../entities/models/vendor.entity";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorModel } from "../../../frameworks/database/models/vendor.model";
import { VendorDTO } from "../../../shared/dtos/user.dto";

@injectable()
export class VendorRepository implements IVendorRepository {
  async save(data: VendorDTO): Promise<IVendorEntity> {
    return await VendorModel.create(data);
  }

  async findByEmail(email: string): Promise<IVendorEntity | null> {
    return await VendorModel.findOne({ email });
  }
}
