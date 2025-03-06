import { ZodError } from "zod";
import { ICreatePaymentIntentController } from "../../../entities/controllerInterfaces/payment/create-payment-intent-controller.inteface";
import { ICreatePaymentIntentUseCase } from "../../../entities/useCaseInterfaces/payment/create-payment-intent-usecase.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { ICreateNewBookingUseCase } from "../../../entities/useCaseInterfaces/booking/create-new-booking-usecase.interface";
import { IPaymentRepository } from "../../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { IBookingRepository } from "../../../entities/repositoryInterfaces/booking/booking-repository.interface";

@injectable()
export class CreatePaymentIntentController
  implements ICreatePaymentIntentController
{
  constructor(
    @inject("ICreatePaymentIntentUseCase")
    private createPaymentIntentUseCase: ICreatePaymentIntentUseCase,
    @inject("ICreateNewBookingUseCase")
    private createNewBookingUseCase: ICreateNewBookingUseCase,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository,
    @inject("IBookingRepository") private bookingRepository: IBookingRepository
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;
      const {
        amount,
        currency = "usd",
        purpose,
        bookingData,
        createrType,
        receiverType,
      } = req.body;

      const amountInCents = Math.round(amount * 100);

      if (!amount || amount <= 0) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "Invalid amount" });
        return;
      }

      if (!purpose.trim()) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "Invalid purpose" });
        return;
      }

      if (!userId) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "User ID is required" });
        return;
      }

      if (purpose === "vendor-booking") {
        // for booking a vendor
        const newBooking = await this.createNewBookingUseCase.execute(
          userId,
          bookingData.vendorId,
          bookingData
        );

        if (!newBooking) {
          res
            .status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: "Invalid booking data" });
          return;
        }

        const { paymentIntent, clientSecret } =
          await this.createPaymentIntentUseCase.execute(
            amountInCents,
            currency,
            purpose,
            userId,
            bookingData.vendorId,
            createrType,
            receiverType,
            newBooking?._id as string
          );

        console.log(
          "in create payment controller =>",
          paymentIntent,
          clientSecret
        );

        const paymentDetails =
          await this.paymentRepository.findByPaymentIntentId(paymentIntent);

        await this.bookingRepository.findByIdAndUpdatePaymentId(
          newBooking._id,
          paymentDetails?._id
        );

        res.json({
          success: true,
          message: "Booking completed and payment successfull.",
          clientSecret,
        });
      } else if (purpose === "role-upgrade") {
        // for role promo to mc
        console.log("in side role promo");

        const { clientSecret } = await this.createPaymentIntentUseCase.execute(
          amountInCents,
          currency,
          purpose,
          userId,
          "67c672337b3e284a71d98fd5" as any,
          "Client",
          "Admin"
        );

        res.json({
          success: true,
          message: "Booking completed and payment successfull.",
          clientSecret,
        });
      } else if (purpose === "ticket-purchase") {
        const { clientSecret } = await this.createPaymentIntentUseCase.execute(
          amountInCents,
          currency,
          purpose,
          userId,
          "67c672337b3e284a71d98fd5" as any,
          "Client",
          "Admin"
        );

        res.json({
          success: true,
          message: "Ticket Booking completed and payment successfull.",
          clientSecret,
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
