import { Request, Response } from "express";
import { IGetAllEventsByHostIdController } from "../../../entities/controllerInterfaces/event/get-all-events-by-host-id-controller.interface";
import { IGetAllEventsByHostIdUseCase } from "../../../entities/useCaseInterfaces/event/get-all-events-by-host-id-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllEventsByHostIdController
  implements IGetAllEventsByHostIdController
{
  constructor(
    @inject("IGetAllEventsByHostIdUseCase")
    private getAllEventsByHostIdUseCase: IGetAllEventsByHostIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const hostId = (req as CustomRequest).user.id;

      const pageNumber = Number(page);
      const pageSize = Number(limit);

      const { events, total } = await this.getAllEventsByHostIdUseCase.execute(
        hostId,
        pageNumber,
        pageSize
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        events,
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
