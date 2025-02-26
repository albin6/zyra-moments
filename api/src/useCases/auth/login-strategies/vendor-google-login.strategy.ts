import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { IUserEntity } from "../../../entities/models/user.entity";

@injectable()
export class VendorGoogleLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
    const vendor = await this.vendorRepository.findByEmail(user.email);
    if (vendor) {
      if (vendor.status !== "active") {
        throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
      }
    }

    return vendor as Partial<IUserEntity>;
  }
}
