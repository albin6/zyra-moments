import { inject } from "tsyringe";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUpdatePasswordStrategy } from "./update-password-strategy.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

export class UpdateVendorPasswordStrategy implements IUpdatePasswordStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async update(email: string, password: string): Promise<void> {
    const isVendorExists = await this.vendorRepository.findByEmail(email);

    if (!isVendorExists) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.vendorRepository.findByIdAndUpdatePassword(
      isVendorExists._id,
      password
    );
  }
}
