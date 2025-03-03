import { Request, Response } from "express";
import { IGetAllTransactionsByUserIdController } from "../../../entities/controllerInterfaces/payment/get-all-transactions-by-userid-controller.interface";
import { IGetAllTransactionsByUserIdUseCase } from "../../../entities/useCaseInterfaces/payment/get-all-transactions-by-userid-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllTransactionsByUserIdController
  implements IGetAllTransactionsByUserIdController
{
  constructor(
    @inject("IGetAllTransactionsByUserIdUseCase")
    private getAllTransactionsByUserIdUseCase: IGetAllTransactionsByUserIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, purpose } = req.query;
      const userId = (req as CustomRequest).user.id;

      const pageNumber = Number(page);
      const pageSize = Number(limit);
      const purposeString = typeof purpose === "string" ? purpose : "client";

      const { payments, total } =
        await this.getAllTransactionsByUserIdUseCase.execute(
          userId,
          purposeString,
          pageNumber,
          pageSize
        );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        payments,
        totalPages: total,
        currentPage: pageNumber,
      });
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
