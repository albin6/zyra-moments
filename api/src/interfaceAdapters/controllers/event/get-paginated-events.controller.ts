import { Request, Response } from "express";
import { IGetPaginatedEventsController } from "../../../entities/controllerInterfaces/event/get-paginated-events-controller.inteface";
import { IGetPaginatedEventsUseCase } from "../../../entities/useCaseInterfaces/event/get-paginated-events-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
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
  }
}
