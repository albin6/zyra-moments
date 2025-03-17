import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { UserDTO, VendorDTO } from "../../../shared/dtos/user.dto";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { generateRandomUUID } from "../../../frameworks/security/randomid.bcrypt";
import { IUserEntity } from "../../../entities/models/user.entity";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";

@injectable()
export class VendorRegisterStrategy implements IRegisterStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt,
    @inject("IWalletRepository") private walletRepository: IWalletRepository
  ) {}

  async register(user: UserDTO): Promise<IUserEntity | void> {
    if (user.role === "vendor") {
      const existingVendor = await this.vendorRepository.findByEmail(
        user.email
      );
      if (existingVendor) {
        throw new CustomError(
          ERROR_MESSAGES.EMAIL_EXISTS,
          HTTP_STATUS.CONFLICT
        );
      }

      const { firstName, lastName, phoneNumber, password, email } =
        user as VendorDTO;

      let hashedPassword = null;

      if (password) {
        hashedPassword = await this.passwordBcrypt.hash(password);
      }

      const vendorId = generateRandomUUID();

      const vendor = await this.vendorRepository.save({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword ?? "",
        vendorId,
        role: "vendor",
      });

      await this.walletRepository.create(vendor._id, "Vendor", "vendor");

      return vendor;
    } else {
      throw new CustomError(
        "Invalid role for vendor registration",
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }
}
