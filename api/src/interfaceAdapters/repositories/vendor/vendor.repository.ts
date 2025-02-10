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

  async findByIdForPasswordUpdate(id: any): Promise<IVendorEntity | null> {
    return await VendorModel.findById(id);
  }

  async find(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ user: IVendorEntity[] | []; total: number }> {
    const [user, total] = await Promise.all([
      VendorModel.find(filter).skip(skip).limit(limit),
      VendorModel.countDocuments(filter),
    ]);

    return {
      user,
      total,
    };
  }

  async findByIdAndUpdatePassword(id: any, password: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, { password });
  }
}
