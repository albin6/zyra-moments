import { Request, Response } from "express";
import { IConfirmPaymenController } from "../../../entities/controllerInterfaces/payment/confirm-payment-controller.interface";
import { IConfirmPaymentUseCase } from "../../../entities/useCaseInterfaces/payment/confirm-payment-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class ConfirmPaymentController implements IConfirmPaymenController {
  constructor(
    @inject("IConfirmPaymentUseCase")
    private confirmPaymentUseCase: IConfirmPaymentUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
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
  }
}
