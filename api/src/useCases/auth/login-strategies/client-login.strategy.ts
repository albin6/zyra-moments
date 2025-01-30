import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRespository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { IPasswordBcrypt } from "../../../frameworks/security/password.bcrypt.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";

@injectable()
export class ClientLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IClientRespository") private clientRepository: IClientRespository,
    @inject("IPasswordBcrypt") private passwordBcrypt: IPasswordBcrypt
  ) {}

  async login(user: LoginUserDTO): Promise<void> {
    const client = await this.clientRepository.findByEmail(user.email);
    if (!client) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const isPasswordMatch = await this.passwordBcrypt.compare(
      user.password,
      client.password
    );
    if (!isPasswordMatch) {
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }
}
