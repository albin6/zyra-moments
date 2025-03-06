import { Request, Response } from "express";
import { IListPaginatedEventsController } from "../../../entities/controllerInterfaces/event/list-paginated-events-controller.interface";
import { IListPaginatedEventsUseCase } from "../../../entities/useCaseInterfaces/event/list-paginated-events-usecase.interface";
import { DomainError } from "../../../entities/utils/DomainError";
import { CustomError } from "../../../entities/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { ZodError } from "zod";
import { EventListDto } from "../../../shared/dtos/event.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListPaginatedEventsController
  implements IListPaginatedEventsController
{
  constructor(
    @inject("IListPaginatedEventsUseCase")
    private listPaginatedEventsUseCase: IListPaginatedEventsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const criteria: EventListDto = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        search: req.query.search as string,
        filters: {
          location: req.query.location as string,
          priceMin: req.query.priceMin
            ? parseFloat(req.query.priceMin as string)
            : undefined,
          priceMax: req.query.priceMax
            ? parseFloat(req.query.priceMax as string)
            : undefined,
        },
        sort:
          req.query.sortField || req.query.sortOrder
            ? {
                field: req.query.sortField as
                  | "date"
                  | "startTime"
                  | "pricePerTicket",
                order: (req.query.sortOrder as "asc" | "desc") || "asc",
              }
            : undefined,
      };

      const result = await this.listPaginatedEventsUseCase.execute(criteria);

      res.json({
        success: true,
        ...result,
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
      if (error instanceof DomainError) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          code: error.code,
          message: error.message,
        });
      }
    }
  }
}
