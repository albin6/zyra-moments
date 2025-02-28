import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IUpdateBookingStatusUseCase } from "../../entities/useCaseInterfaces/booking/update-booking-status-usecase.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateBookingStatusUseCase implements IUpdateBookingStatusUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepository: IBookingRepository
  ) {}
  async execute(bookingId: any, status: string): Promise<void> {
    // either confirmed or completed
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      throw new CustomError("Booking not found", HTTP_STATUS.NOT_FOUND);
    }

    await this.bookingRepository.findByIdAndUpdateBookingStatus(
      bookingId,
      status
    );

    if (status === "completed") {
      // Here i need trigger the fund release process
    }
  }
}
