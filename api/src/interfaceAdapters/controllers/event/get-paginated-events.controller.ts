import { Request, Response } from "express";
import { IGetPaginatedEventsController } from "../../../entities/controllerInterfaces/event/get-paginated-events-controller.inteface";
import { EventFilterParams } from "../../../entities/models/event.entity";
import { IGetPaginatedEventsUseCase } from "../../../entities/useCaseInterfaces/event/get-paginated-events-usecase.interface";
import { boolean, ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetPaginatedEventsController
  implements IGetPaginatedEventsController
{
  constructor(
    @inject("IGetPaginatedEventsUseCase")
    private getPaginatedEventsUseCase: IGetPaginatedEventsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = "", date, status } = req.query;

      const pageNumber = Number(page);
      const pageSize = Number(limit);

      const parsedStatus =
        status === "true"
          ? true
          : status === "false"
          ? false
          : status === ""
          ? undefined
          : undefined;
      const searchString = typeof search === "string" ? search : "";
      const dateValue = date ? new Date(date as string) : undefined;

      const result = await this.getPaginatedEventsUseCase.execute({
        pageNumber,
        pageSize,
        searchString,
        dateValue,
        parsedStatus,
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        ...result,
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
