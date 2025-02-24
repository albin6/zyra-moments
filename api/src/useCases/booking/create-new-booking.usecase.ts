import { inject, injectable } from "tsyringe";
import { Booking, IBookingEntity } from "../../entities/models/booking.entity";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IServiceRepository } from "../../entities/repositoryInterfaces/common/service-repository.interface";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { ICreateNewBookingUseCase } from "../../entities/useCaseInterfaces/booking/create-new-booking-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class CreateNewBookingUseCase implements ICreateNewBookingUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepository: IBookingRepository,
    @inject("IServiceRepository") private serviceRepository: IServiceRepository,
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}
  async execute(
    userId: any,
    vendorId: any,
    data: Booking
  ): Promise<IBookingEntity | null> {
    const isVendorExistsWithId = await this.vendorRepository.findById(vendorId);

    if (!isVendorExistsWithId) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const service = await this.serviceRepository.findById(data.serviceId);

    if (!service) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    const serviceDetails = {
      serviceTitle: service.serviceTitle,
      serviceDescription: service.serviceDescription,
      serviceDuration: service.serviceDuration,
      servicePrice: service.servicePrice,
      additionalHoursPrice: service.additionalHoursPrice,
      cancellationPolicies: service.cancellationPolicies,
      termsAndConditions: service.termsAndConditions,
    };

    return await this.bookingRepository.save({
      userId,
      serviceDetails,
      bookingDate: data.bookingDate,
      timeSlot: data.timeSlot,
      vendorId,
      totalPrice: data.totalPrice,
    });
  }
}
