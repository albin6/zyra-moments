import { injectable } from "tsyringe";
import { IVendorEntity } from "../../../entities/models/vendor.entity";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorModel } from "../../../frameworks/database/models/vendor.model";
import { ObjectId } from "mongoose";

@injectable()
export class VendorRepository implements IVendorRepository {
  async save(data: Partial<IVendorEntity>): Promise<IVendorEntity> {
    return await VendorModel.create(data);
  }

  async findByEmail(email: string): Promise<IVendorEntity | null> {
    return await VendorModel.findOne({ email });
  }

  async findByIdAndUpdate(
    vendorId: ObjectId,
    categoryId: ObjectId
  ): Promise<IVendorEntity | null> {
    return await VendorModel.findByIdAndUpdate(
      vendorId,
      {
        category: categoryId,
      },
      { new: true }
    );
  }
  async findById(id: any): Promise<IVendorEntity | null> {
    return await VendorModel.findById(id).select("-password").populate({
      path: "category",
      select: "title",
    });
  }

  async find(): Promise<IVendorEntity[] | []> {
    return await VendorModel.find();
  }
}
