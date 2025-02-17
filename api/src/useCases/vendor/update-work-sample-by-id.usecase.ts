import { inject, injectable } from "tsyringe";
import { IWorkSampleEntity } from "../../entities/models/work-sample.entity";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { IUpdateWorkSampleByIdUseCase } from "../../entities/useCaseInterfaces/vendor/update-work-sample-by-id-usecase.interface";

@injectable()
export class UpdateWorkSampleByIdUseCase
  implements IUpdateWorkSampleByIdUseCase
{
  constructor(
    @inject("IWorkSampleRepository")
    private workSampleRepository: IWorkSampleRepository
  ) {}
  async execute(id: any, data: Partial<IWorkSampleEntity>): Promise<void> {
    await this.workSampleRepository.findByIdAndUpdate(id, data);
  }
}
