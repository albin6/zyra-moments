import { inject, injectable } from "tsyringe";
import { IVendorEntity } from "../../entities/models/vendor.entity";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUpdateVendorProfileUseCase } from "../../entities/useCaseInterfaces/vendor/update-vendor-profile-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateVendorProfileUseCase implements IUpdateVendorProfileUseCase {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(vendorId: string, data: Partial<IVendorEntity>): Promise<void> {
    const isVendorExists = await this.vendorRepository.findById(vendorId);

    if (!isVendorExists) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.vendorRepository.updateVendorProfileById(vendorId, data);
  }
}
