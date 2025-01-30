import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IAdminRepository } from "../../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { IPasswordBcrypt } from "../../../frameworks/security/password.bcrypt.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { IUserEntity } from "../../../entities/models/user.entity";

@injectable()
export class AdminLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IAdminRepository") private adminRepository: IAdminRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IPasswordBcrypt
  ) {}

  async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
    const admin = await this.adminRepository.findByEmail(user.email);
    if (!admin) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isPasswordMatch = await this.passwordBcrypt.compare(
      user.password,
      admin.password
    );
    if (!isPasswordMatch) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    return admin;
  }
}
