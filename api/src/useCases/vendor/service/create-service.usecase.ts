import { inject, injectable } from "tsyringe";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { IServiceRepository } from "../../../entities/repositoryInterfaces/common/service-repository.interface";
import { ICreateServiceUseCase } from "../../../entities/useCaseInterfaces/vendor/service/create-service-usecase.interface";

@injectable()
export class CreateServiceUseCase implements ICreateServiceUseCase {
  constructor(
    @inject("IServiceRepository") private serviceRepository: IServiceRepository
  ) {}
  async execute(data: IServiceEntity): Promise<void> {
    await this.serviceRepository.save(data);
  }
}
