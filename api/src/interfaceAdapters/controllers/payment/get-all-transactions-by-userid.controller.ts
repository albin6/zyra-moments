import { Request, Response } from "express";
import { IGetAllTransactionsByUserIdController } from "../../../entities/controllerInterfaces/payment/get-all-transactions-by-userid-controller.interface";
import { IGetAllTransactionsByUserIdUseCase } from "../../../entities/useCaseInterfaces/payment/get-all-transactions-by-userid-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
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
    const { page = 1, limit = 10, purpose } = req.query;
    const userId = (req as CustomRequest).user.id;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const purposeString = typeof purpose === "string" ? purpose : "client";

    const { payments, total } =
      await this.getAllTransactionsByUserIdUseCase.execute(
        userId,
        "",
        pageNumber,
        pageSize
      );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      payments,
      totalPages: total,
      currentPage: pageNumber,
    });
  }
}
