import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-respository.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { IUserEntity } from "../../../entities/models/user.entity";

@injectable()
export class ClientGoogleLoginStrategy implements ILoginStrategy {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository
  ) {}

  async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
    const client = await this.clientRepository.findByEmail(user.email);
    if (client) {
      if (client.status !== "active") {
        throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
      }
    }

    return client as Partial<IUserEntity>;
  }
}
