import { ObjectId, Types } from "mongoose";
import { IVendorEntity } from "../../entities/models/vendor.entity";
import { IJoinCategoryUseCase } from "../../entities/useCaseInterfaces/common/join-category-usecase.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class JoinCategoryUseCase implements IJoinCategoryUseCase {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(
    vendorId: ObjectId,
    categoryId: ObjectId
  ): Promise<IVendorEntity | null> {
    return await this.vendorRepository.findByIdAndUpdate(vendorId, categoryId);
  }
}
