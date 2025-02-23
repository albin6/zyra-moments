import { ZodError } from "zod";
import { ICreatePaymentIntentController } from "../../../entities/controllerInterfaces/payment/create-payment-intent-controller.inteface";
import { ICreatePaymentIntentUseCase } from "../../../entities/useCaseInterfaces/payment/create-payment-intent-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class CreatePaymentIntentController
  implements ICreatePaymentIntentController
{
  constructor(
    @inject("ICreatePaymentIntentUseCase")
    private createPaymentIntentUseCase: ICreatePaymentIntentUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;
      const { amount, currency = "usd", purpose } = req.body;

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

      const clientSecret = await this.createPaymentIntentUseCase.execute(
        amountInCents,
        currency,
        purpose,
        userId
      );
      res.json({ success: true, clientSecret });
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
