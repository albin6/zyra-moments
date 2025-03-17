import { inject, injectable } from "tsyringe";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { IServiceRepository } from "../../../entities/repositoryInterfaces/common/service-repository.interface";
import { IGetServiceDetailsByIdUseCase } from "../../../entities/useCaseInterfaces/vendor/service/get-service-details-by-id-usecase.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class GetServiceDetailsByIdUseCase
  implements IGetServiceDetailsByIdUseCase
{
  constructor(
    @inject("IServiceRepository") private serviceRepostory: IServiceRepository
  ) {}
  async execute(id: any): Promise<IServiceEntity | null> {
    const service = await this.serviceRepostory.findById(id);

    if (!service) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    return service;
  }
}
