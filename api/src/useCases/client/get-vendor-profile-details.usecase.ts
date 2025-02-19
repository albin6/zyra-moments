import { inject, injectable } from "tsyringe";
import { VendorProfileForClient } from "../../entities/models/vendor-profile-for-client.entity";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetVendorProfileDetailsUseCase } from "../../entities/useCaseInterfaces/client/get-vendor-profile-details-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { IServiceRepository } from "../../entities/repositoryInterfaces/common/service-repository.interface";

@injectable()
export class GetVendorProfileDetailsUseCase
  implements IGetVendorProfileDetailsUseCase
{
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository,
    @inject("IWorkSampleRepository")
    private workSampleRepository: IWorkSampleRepository,
    @inject("IServiceRepository") private serviceRepository: IServiceRepository
  ) {}
  async execute(
    id: any,
    paginatedParams: {
      servicePage: number;
      workSamplePage: number;
      limit: number;
    }
  ): Promise<VendorProfileForClient> {
    const vendorData = await this.vendorRepository.findById(id);

    if (!vendorData) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    // if (
    //   !vendorData.firstName ||
    //   !vendorData.lastName ||
    //   !vendorData.email ||
    //   !vendorData.status ||
    //   !vendorData.vendorId ||
    //   !vendorData.bio ||
    //   !vendorData.place
    // ) {
    //   throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    // }

    const validWorkSamplePageNumber = Math.max(
      1,
      paginatedParams.workSamplePage || 1
    );
    const validWorkSamplePageSize = Math.max(1, paginatedParams.limit || 10);
    const skipWorkSample =
      (validWorkSamplePageNumber - 1) * validWorkSamplePageSize;
    const limitWorkSample = validWorkSamplePageSize;

    const { workSamples, total: totalWorkSamples } =
      await this.workSampleRepository.findAllByVendorId(
        id,
        skipWorkSample,
        limitWorkSample
      );

    const validServicePageNumber = Math.max(
      1,
      paginatedParams.servicePage || 1
    );
    const validServicePageSize = Math.max(1, paginatedParams.limit || 10);
    const skipService = (validServicePageNumber - 1) * validServicePageSize;
    const limitService = validServicePageSize;

    const { services, total: totalServices } =
      await this.serviceRepository.findByVendorId(
        id,
        skipService,
        limitService
      );

    const response: VendorProfileForClient = {
      _id: vendorData._id!,
      firstName: vendorData.firstName!,
      lastName: vendorData.lastName!,
      email: vendorData.email,
      profileImage: vendorData?.profileImage,
      phoneNumber: vendorData?.phoneNumber,
      status: vendorData.status!,
      vendorId: vendorData.vendorId,
      category: vendorData.category,
      bio: vendorData.bio,
      place: vendorData.place,
      averageRating: vendorData.averageRating,
      totalReviews: vendorData.totalReviews,
      servicesData: {
        services,
        total: Math.ceil(totalServices / validServicePageSize),
      },
      workSamplesData: {
        workSamples: workSamples,
        total: Math.ceil(totalWorkSamples / validWorkSamplePageSize),
      },
    };

    return response;
  }
}
