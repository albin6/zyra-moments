import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IVendorRepository } from "../../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { UserDTO, VendorDTO } from "../../../shared/dtos/user.dto";
import { IPasswordBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { generateRandomUUID } from "../../../frameworks/security/randomid.bcrypt";

@injectable()
export class VendorRegisterStrategy implements IRegisterStrategy {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IPasswordBcrypt
  ) {}

  async register(user: UserDTO): Promise<void> {
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

      const hashedPassword = await this.passwordBcrypt.hash(password);

      const vendorId = generateRandomUUID();

      await this.vendorRepository.save({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        vendorId,
        role: "vendor",
      });
    } else {
      throw new CustomError(
        "Invalid role for vendor registration",
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }
}
