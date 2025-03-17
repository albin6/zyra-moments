import { inject, injectable } from "tsyringe";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { IGetAllWorkSampleByVendorIdUseCase } from "../../entities/useCaseInterfaces/vendor/get-all-work-sample-by-vendorid-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { PaginatedWorkSample } from "../../entities/models/paginated-work-sample.entity";

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
    vendorId: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedWorkSample> {
    const isVendorExistsWithThisId = await this.vendorRepository.findById(
      vendorId
    );

    if (!isVendorExistsWithThisId) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    const { workSamples, total, all } =
      await this.workSampleRepository.findAllByVendorId(vendorId, skip, limit);

    const response: PaginatedWorkSample = {
      workSamples,
      total: Math.ceil(total / validPageSize),
      all,
    };

    return response;
  }
}
