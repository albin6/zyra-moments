import { inject, injectable } from "tsyringe";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { IServiceRepository } from "../../../entities/repositoryInterfaces/common/service-repository.interface";
import { IUpdateServiceByIdUseCase } from "../../../entities/useCaseInterfaces/vendor/service/update-service-by-id-usecase.interface";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class UpdateServiceByIdUseCase implements IUpdateServiceByIdUseCase {
  constructor(
    @inject("IServiceRepository") private serviceRepository: IServiceRepository
  ) {}
  async execute(id: any, data: IServiceEntity): Promise<void> {
    const isServiceWithIdExists = await this.serviceRepository.findById(id);

    if (!isServiceWithIdExists) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    await this.serviceRepository.findByIdAndUpdate(id, data);
  }
}
