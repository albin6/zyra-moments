import { inject, injectable } from "tsyringe";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { IDeleteWorkSampleByIdUseCase } from "../../entities/useCaseInterfaces/vendor/delete-work-sample-by-id-usecase.interface";

@injectable()
export class DeleteWorkSampleByIdUseCase
  implements IDeleteWorkSampleByIdUseCase
{
  constructor(
    @inject("IWorkSampleRepository")
    private workSampleRepository: IWorkSampleRepository
  ) {}
  async execute(id: any): Promise<void> {
    await this.workSampleRepository.deleteById(id);
  }
}
