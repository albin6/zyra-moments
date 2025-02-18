import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "../../../entities/repositoryInterfaces/common/service-repository.interface";
import { IGetAllServicesByVendorIdUseCase } from "../../../entities/useCaseInterfaces/vendor/service/get-all-services-by-vendor-id-usecase.interface";
import { PaginatedServices } from "../../../entities/models/paginated-services.entity";

@injectable()
export class GetAllServicesByVendorIdUseCase
  implements IGetAllServicesByVendorIdUseCase
{
  constructor(
    @inject("IServiceRepository") private serviceRepository: IServiceRepository
  ) {}
  async execute(
    id: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedServices> {
    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;
    const { services, total, all } =
      await this.serviceRepository.findByVendorId(id, skip, limit);

    const response: PaginatedServices = {
      services,
      total: Math.ceil(total / validPageSize),
      all,
    };

    return response;
  }
}
