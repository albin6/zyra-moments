import { inject, injectable } from "tsyringe";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserDTO } from "../../shared/dtos/user.dto";
import { IClientRespository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { IPasswordBcrypt } from "../../frameworks/security/password.bcrypt.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject("IClientRespository") private clientRepository: IClientRespository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IAdminRepository") private adminRespository: IAdminRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IPasswordBcrypt
  ) {}

  async execute(user: LoginUserDTO): Promise<void> {
    switch (user.role) {
      case "admin":
        const isAdminExistsWithTheEmail =
          await this.adminRespository.findByEmail(user.email);
        if (!isAdminExistsWithTheEmail) {
          throw new CustomError("Email Not Found", HTTP_STATUS.NOT_FOUND);
        }

        const isPasswordMatch = await this.passwordBcrypt.compare(
          user.password,
          isAdminExistsWithTheEmail.password
        );

        if (!isPasswordMatch) {
          throw new CustomError(
            "Invalid email or password",
            HTTP_STATUS.BAD_REQUEST
          );
        }

        break;
      case "client":
        break;
      case "vendor":
        break;

      default:
        break;
    }
    return;
  }
}
