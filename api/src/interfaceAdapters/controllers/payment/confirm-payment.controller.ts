import { Request, Response } from "express";
import { IConfirmPaymenController } from "../../../entities/controllerInterfaces/payment/confirm-payment-controller.interface";
import { IConfirmPaymentUseCase } from "../../../entities/useCaseInterfaces/payment/confirm-payment-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ConfirmPaymentController implements IConfirmPaymenController {
  constructor(
    @inject("IConfirmPaymentUseCase")
    private confirmPaymentUseCase: IConfirmPaymentUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.body;

      if (!paymentIntentId) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "Payment intent ID is required" });
        return;
      }

      const isConfirmed = await this.confirmPaymentUseCase.execute(
        paymentIntentId
      );
      res.json({ success: isConfirmed, message: "Payment Confirmed" });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
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
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
}
