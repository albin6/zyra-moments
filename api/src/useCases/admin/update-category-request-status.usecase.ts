import { inject, injectable } from "tsyringe";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { IUpdateCategoryRequestStatusUseCase } from "../../entities/useCaseInterfaces/admin/update-category-request-status-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";

@injectable()
export class UpdateCategoryRequestStatusUseCase
  implements IUpdateCategoryRequestStatusUseCase
{
  constructor(
    @inject("ICategoryRequestRepository")
    private categoryRequestRepository: ICategoryRequestRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(id: any, status: string): Promise<void> {
    const categoryRequestExists = await this.categoryRequestRepository.findById(
      id
    );

    if (!categoryRequestExists) {
      throw new CustomError(
        ERROR_MESSAGES.REQUEST_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (status === "accepted") {
      await this.vendorRepository.findByIdAndUpdateVendorCategory(
        categoryRequestExists.vendorId,
        categoryRequestExists.categoryId
      );
    }

    await this.categoryRequestRepository.findByIdAndUpdateStatus(id, status);
  }
}
