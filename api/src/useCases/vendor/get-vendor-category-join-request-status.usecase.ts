import { inject, injectable } from "tsyringe";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetVendorCategoryJoinRequestStatusUseCase } from "../../entities/useCaseInterfaces/vendor/get-vendor-category-join-request-status-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetVendorCategoryJoinRequestStatusUseCase
  implements IGetVendorCategoryJoinRequestStatusUseCase
{
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("ICategoryRequestRepository")
    private categoryRequestRepository: ICategoryRequestRepository
  ) {}
  async execute(vendorId: any): Promise<boolean> {
    const isVendorExists = await this.vendorRepository.findById(vendorId);

    if (!isVendorExists) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isVendorRequestedForCategory =
      await this.categoryRequestRepository.findByVendorId(vendorId);

    return isVendorRequestedForCategory ? true : false;
  }
}
