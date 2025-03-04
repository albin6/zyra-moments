import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IAdminRepository } from "../../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";

@injectable()
export class AdminRegisterStrategy implements IRegisterStrategy {
  constructor(
    @inject("IAdminRepository") private adminRepository: IAdminRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt,
    @inject("IWalletRepository") private walletRepository: IWalletRepository
  ) {}

  async register(user: UserDTO): Promise<void> {
    if (user.role === "admin") {
      const existingAdmin = await this.adminRepository.findByEmail(user.email);
      if (existingAdmin) {
        throw new CustomError(
          ERROR_MESSAGES.EMAIL_EXISTS,
          HTTP_STATUS.CONFLICT
        );
      }

      const { email, password } = user as AdminDTO;

      const hashedPassword = await this.passwordBcrypt.hash(password);

      const admin = await this.adminRepository.save({
        email,
        password: hashedPassword,
        role: "admin",
      });

      await this.walletRepository.create(admin._id, "Admin", "admin");
    } else {
      throw new CustomError(
        "Invalid role for admin registration",
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }
}
