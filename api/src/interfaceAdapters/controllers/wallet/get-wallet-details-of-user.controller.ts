import { Request, Response } from "express";
import { IGetWalletDetailsOfUserController } from "../../../entities/controllerInterfaces/wallet/get-wallet-details-of-user-controller.interface";
import { IGetWalletDetailsOfUserUseCase } from "../../../entities/useCaseInterfaces/wallet/get-wallet-details-of-user-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetWalletDetailsOfUserController
  implements IGetWalletDetailsOfUserController
{
  constructor(
    @inject("IGetWalletDetailsOfUserUseCase")
    private getWalletDetailsOfUserUseCase: IGetWalletDetailsOfUserUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;

      const walletData = await this.getWalletDetailsOfUserUseCase.execute(
        userId
      );

      res.status(HTTP_STATUS.OK).json({ success: true, walletData });
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
