import { inject, injectable } from "tsyringe";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IVendorCategoryRequestStatusUseCase } from "../../entities/useCaseInterfaces/common/vendor-category-request-status-usecase.inteface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class VendorCatrgoryRequestStatus
  implements IVendorCategoryRequestStatusUseCase
{
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("ICategoryRequestRepository")
    private categoryRequestRepository: ICategoryRequestRepository
  ) {}
  async execute(vendorId: any): Promise<void> {
    const vendorData = await this.vendorRepository.findById(vendorId);

    const isVendorRequested =
      await this.categoryRequestRepository.findByVendorId(vendorId);

    if (!vendorData?.category && !isVendorRequested) {
      throw new CustomError(
        "Not Requested Or Not Joined Any Category",
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }
}
