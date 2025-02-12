import { inject, injectable } from "tsyringe";
import { IWorkSampleEntity } from "../../entities/models/work-sample.entity";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { ICreateWorkSampleUseCase } from "../../entities/useCaseInterfaces/vendor/create-work-sample-usercase.interface";

@injectable()
export class CreateWorkSampleUseCase implements ICreateWorkSampleUseCase {
  constructor(
    @inject("IWorkSampleRepository")
    private workSampleRepository: IWorkSampleRepository
  ) {}
  async execute(data: IWorkSampleEntity): Promise<void> {
    await this.workSampleRepository.create(data);
  }
}
