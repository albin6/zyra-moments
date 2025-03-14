import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IGetTheClientVendorConnectionStatusUseCase } from "../../entities/useCaseInterfaces/client/get-the-client-vendor-connection-status-usecase.interface";

@injectable()
export class GetTheClientVendorConnectionStatusUseCase
  implements IGetTheClientVendorConnectionStatusUseCase
{
  constructor(
    @inject("IBookingRepository") private bookingRepository: IBookingRepository
  ) {}
  async execute(clientId: any, vendorId: any): Promise<boolean> {
    const booking = await this.bookingRepository.findByClientIdAndVendorId(
      clientId,
      vendorId
    );

    if (!booking) {
      return false;
    }

    return true;
  }
}
