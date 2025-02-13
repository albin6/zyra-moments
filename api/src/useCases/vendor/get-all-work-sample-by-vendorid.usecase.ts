import { inject, injectable } from "tsyringe";
import { IWorkSampleEntity } from "../../entities/models/work-sample.entity";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { IGetAllWorkSampleByVendorIdUseCase } from "../../entities/useCaseInterfaces/vendor/get-all-work-sample-by-vendorid-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetAllWorkSampleByVendorIdUseCase
  implements IGetAllWorkSampleByVendorIdUseCase
{
  constructor(
    @inject("IWorkSampleRepository")
    private workSampleRepository: IWorkSampleRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(
    vendorId: any
  ): Promise<
    Pick<IWorkSampleEntity, "_id" | "title" | "description" | "images">[]
  > {
    const isVendorExistsWithThisId = await this.vendorRepository.findById(
      vendorId
    );

    if (!isVendorExistsWithThisId) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.workSampleRepository.findAllByVendorId(vendorId);
  }
}
