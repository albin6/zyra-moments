import { inject, injectable } from "tsyringe";
import { IVendorEntity } from "../../entities/models/vendor.entity";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetVendorDetailsUseCase } from "../../entities/useCaseInterfaces/vendor/get-vendor-details-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetVendorDetailsUseCase implements IGetVendorDetailsUseCase {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async execute(vendorId: any): Promise<IVendorEntity | null> {
    const vendor = await this.vendorRepository.findById(vendorId);

    if (!vendor) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return vendor;
  }
}
