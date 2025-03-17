import { inject, injectable } from "tsyringe";
import { IClientEntity } from "../../entities/models/client.entity";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IUpdateClientProfileUseCase } from "../../entities/useCaseInterfaces/client/update-client-profile-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateClientProfileUseCase implements IUpdateClientProfileUseCase {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository
  ) {}
  async execute(clientId: string, data: Partial<IClientEntity>): Promise<void> {
    const isClientExists = await this.clientRepository.findById(clientId);

    if (!isClientExists) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.clientRepository.updateClientProfileById(clientId, data);
  }
}
