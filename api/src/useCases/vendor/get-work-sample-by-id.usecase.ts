import { inject, injectable } from "tsyringe";
import { IWorkSampleEntity } from "../../entities/models/work-sample.entity";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { IGetWorkSampleByIdUseCase } from "../../entities/useCaseInterfaces/vendor/get-work-sample-by-id-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetWorkSampleByIdUseCase implements IGetWorkSampleByIdUseCase {
  constructor(
    @inject("IWorkSampleRepository")
    private workSampleRepository: IWorkSampleRepository
  ) {}
  async execute(
    id: any
  ): Promise<Pick<
    IWorkSampleEntity,
    "_id" | "title" | "description" | "images"
  > | null> {
    const workSample = await this.workSampleRepository.findById(id);
    if (!workSample) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }
    return workSample;
  }
}
