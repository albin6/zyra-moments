import { Request, Response } from "express";
import { IGetAllEventsByHostIdController } from "../../../entities/controllerInterfaces/event/get-all-events-by-host-id-controller.interface";
import { IGetAllEventsByHostIdUseCase } from "../../../entities/useCaseInterfaces/event/get-all-events-by-host-id-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
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
  }
}
