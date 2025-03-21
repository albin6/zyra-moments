import { injectable } from "tsyringe";
import { IVendorEntity } from "../../../entities/models/vendor.entity";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import {
  IVendorModel,
  VendorModel,
} from "../../../frameworks/database/models/vendor.model";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class VendorRepository implements IVendorRepository {
  async save(data: Partial<IVendorEntity>): Promise<IVendorEntity> {
    return await VendorModel.create(data);
  }

  async findByEmail(email: string): Promise<IVendorEntity | null> {
    return await VendorModel.findOne({ email });
  }

  async findByIdAndUpdateVendorCategory(
    vendorId: any,
    categoryId: any
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
      VendorModel.find(filter)
        .populate({ path: "category", select: "title" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
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

  async findByIdAndUpdateStatus(id: any, status: string): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, {
      $set: {
        status: status,
      },
    });
  }

  async updateVendorProfileById(
    id: string,
    data: Partial<IVendorEntity>
  ): Promise<void> {
    await VendorModel.findByIdAndUpdate(id, { $set: data });
  }

  async findByCategoryId(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<{ vendors: IVendorEntity[] | []; total: number }> {
    const [vendors, total] = await Promise.all([
      VendorModel.find(filter, {
        firstName: 1,
        lastName: 1,
        profileImage: 1,
        averageRating: 1,
      })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      VendorModel.countDocuments(filter),
    ]);
    return {
      vendors,
      total,
    };
  }

  async findBestVendors(): Promise<IVendorEntity[] | []> {
    return await VendorModel.find()
      .limit(6)
      .populate({ path: "category", select: "title" });
  }

  async update(
    vendorId: any,
    data: Partial<IVendorEntity>
  ): Promise<IVendorEntity> {
    const updatedVendor = await VendorModel.findByIdAndUpdate(
      vendorId,
      { $set: data },
      { new: true }
    ).exec();

    if (!updatedVendor) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return updatedVendor;
  }

  // -------------------------------------------------------------------------
  async findByIdForChat(id: any): Promise<IVendorEntity | null> {
    return VendorModel.findById(id).exec();
  }

  async findByIdAndUpdateOnlineStatus(
    vendorId: string,
    status: "online" | "offline"
  ): Promise<IVendorModel | null> {
    return await VendorModel.findByIdAndUpdate(
      vendorId,
      { onlineStatus: status, lastStatusUpdated: new Date() },
      { new: true }
    ).exec();
  }

  async findByIds(vendorIds: string[]): Promise<IVendorModel[]> {
    return await VendorModel.find({
      _id: { $in: vendorIds },
    }).exec();
  }
}
