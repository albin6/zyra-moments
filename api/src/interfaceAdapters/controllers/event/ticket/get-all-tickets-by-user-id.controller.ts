import { Request, Response } from "express";
import { IGetAllTicketsByUserIdController } from "../../../../entities/controllerInterfaces/event/ticket/get-all-tickets-by-user-id-controller.interface";
import { IGetAllTicketsByUserIdUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/get-all-tickets-by-user-id-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
import { CustomRequest } from "../../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllTicketsByUserIdController
  implements IGetAllTicketsByUserIdController
{
  constructor(
    @inject("IGetAllTicketsByUserIdUseCase")
    private getAllTicketsByUserIdUseCase: IGetAllTicketsByUserIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = Number(page);
      const pageSize = Number(limit);

      const { tickets, total } =
        await this.getAllTicketsByUserIdUseCase.execute(
          userId,
          pageNumber,
          pageSize
        );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        tickets,
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
