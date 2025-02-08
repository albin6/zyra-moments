import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { IUserEntity } from "../../../entities/models/user.entity";

@injectable()
export class VendorLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
  ) {}

  async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
    const vendor = await this.vendorRepository.findByEmail(user.email);
    if (!vendor) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isPasswordMatch = await this.passwordBcrypt.compare(
      user.password,
      vendor.password
    );
    if (!isPasswordMatch) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return vendor;
  }
}
