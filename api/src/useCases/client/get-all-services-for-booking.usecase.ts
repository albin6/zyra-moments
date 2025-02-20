import { inject, injectable } from "tsyringe";
import { IServiceEntity } from "../../entities/models/service.entity";
import { IServiceRepository } from "../../entities/repositoryInterfaces/common/service-repository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetAllServicesForBookingUseCase } from "../../entities/useCaseInterfaces/client/get-all-services-for-booking-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class GetAllServicesForBookingUseCase
  implements IGetAllServicesForBookingUseCase
{
  constructor(
    @inject("IServiceRepository") private serviceRepository: IServiceRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(id: any): Promise<IServiceEntity[] | []> {
    const isVendorExistsWithId = await this.vendorRepository.findById(id);
    if (!isVendorExistsWithId) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }
    return await this.serviceRepository.findAllServiceByVendorId(id);
  }
}
