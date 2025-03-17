import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUpdateVendorPasswordUseCase } from "../../entities/useCaseInterfaces/vendor/update-vendor-password-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateVendorPasswordUseCase
  implements IUpdateVendorPasswordUseCase
{
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
  ) {}
  async execute(id: any, current: string, newPassword: string): Promise<void> {
    const user = await this.vendorRepository.findByIdForPasswordUpdate(id);
    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isPasswordMatch = await this.passwordBcrypt.compare(
      current,
      user.password
    );

    if (!isPasswordMatch) {
      throw new CustomError(
        ERROR_MESSAGES.WRONG_CURRENT_PASSWORD,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const isCurrentAndNewPasswordAreSame = await this.passwordBcrypt.compare(
      newPassword,
      user.password
    );

    if (isCurrentAndNewPasswordAreSame) {
      throw new CustomError(
        ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const hashedPassword = await this.passwordBcrypt.hash(newPassword);

    await this.vendorRepository.findByIdAndUpdatePassword(id, hashedPassword);
  }
}
