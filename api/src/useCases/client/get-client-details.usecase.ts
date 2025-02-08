import { inject, injectable } from "tsyringe";
import { IClientEntity } from "../../entities/models/client.entity";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { IGetClientDetailsUseCase } from "../../entities/useCaseInterfaces/client/get-client-details-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetClientDetailsUseCase implements IGetClientDetailsUseCase {
  constructor(
    @inject("IClientRepository") private clientRepository: IClientRepository
  ) {}
  async execute(id: any): Promise<IClientEntity | null> {
    const clientDetails = await this.clientRepository.findById(id);

    if (!clientDetails) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return clientDetails;
  }
}
