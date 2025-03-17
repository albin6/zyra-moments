import { inject, injectable } from "tsyringe";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IUpdateBookingStatusUseCase } from "../../entities/useCaseInterfaces/booking/update-booking-status-usecase.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";

@injectable()
export class UpdateBookingStatusUseCase implements IUpdateBookingStatusUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepository: IBookingRepository,
    @inject("IWalletRepository") private walletRepository: IWalletRepository,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {}
  async execute(userId: any, bookingId: any, status: string): Promise<void> {
    // either confirmed or completed
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      throw new CustomError(
        ERROR_MESSAGES.BOOKING_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.bookingRepository.findByIdAndUpdateBookingStatus(
      bookingId,
      status
    );

    if (status === "completed") {
      const payment = await this.paymentRepository.findByBookingId(bookingId);

      // const isBothApproved = await this.bookingRepository.isBothApproved(
      //   booking._id
      // );
      // if (isBothApproved) {
      //   await this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
      //     booking.vendorId,
      //     booking.totalPrice,
      //     payment?._id
      //   );
      // }

      if (userId == booking.userId && !booking.isClientApproved) {
        const booking = await this.bookingRepository.updateClientApproved(
          userId
        );
        if (booking?.isVendorApproved) {
          await Promise.all([
            this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
              booking.vendorId,
              booking.totalPrice,
              payment?._id
            ),
            this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
              "67c672347b3e284a71d98fd7" as any,
              booking.totalPrice * -1,
              payment?._id
            ),
          ]);
        }
      } else if (userId == booking.vendorId && !booking.isVendorApproved) {
        const booking = await this.bookingRepository.updateVendorApproved(
          userId
        );
        if (booking?.isClientApproved) {
          await Promise.all([
            this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
              booking.vendorId,
              booking.totalPrice,
              payment?._id
            ),
            this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
              "67c672347b3e284a71d98fd7" as any,
              booking.totalPrice * -1,
              payment?._id
            ),
          ]);
        }
      }
    }
  }
}
