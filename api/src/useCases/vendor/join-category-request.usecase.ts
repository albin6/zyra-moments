import { ObjectId } from "mongoose";
import { IJoinCategoryRequestUseCase } from "../../entities/useCaseInterfaces/vendor/join-category-request-usecase.interface";
import { inject, injectable } from "tsyringe";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class JoinCategoryRequestUseCase implements IJoinCategoryRequestUseCase {
  constructor(
    @inject("ICategoryRequestRepository")
    private categoryRequestRepository: ICategoryRequestRepository
  ) {}
  async execute(vendorId: ObjectId, categoryId: ObjectId): Promise<void> {
    const categoryRequest =
      await this.categoryRequestRepository.findByVendorAndCategory(
        vendorId,
        categoryId
      );

    if (categoryRequest) {
      throw new CustomError("Already Requested", HTTP_STATUS.CONFLICT);
    }

    await this.categoryRequestRepository.save(vendorId, categoryId);
  }
}
