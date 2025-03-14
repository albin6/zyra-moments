import { Request, Response } from "express";
import { IHandleWebHookController } from "../../../entities/controllerInterfaces/payment/handle-webhook-controller.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IWebHookUseCase } from "../../../entities/useCaseInterfaces/payment/webhook-usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandleWebHookController implements IHandleWebHookController {
  constructor(
    @inject("IWebHookUseCase") private webHookUseCase: IWebHookUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const sig = req.headers["stripe-signature"];
      if (!sig || typeof sig !== "string") {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "Missing Stripe signature" });
        return;
      }

      await this.webHookUseCase.execute(sig, req.body);

      res.status(HTTP_STATUS.OK).json({ received: true });
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
