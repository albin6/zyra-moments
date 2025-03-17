import { Request, Response } from "express";
import { IGetEventAttendanceController } from "../../../entities/controllerInterfaces/event/get-event-attendance-controller.interface";
import { IGetEventAttendanceUseCase } from "../../../entities/useCaseInterfaces/event/get-event-attendance-usecase.interface";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetEventAttendanceController
  implements IGetEventAttendanceController
{
  constructor(
    @inject("IGetEventAttendanceUseCase")
    private getEventAttendanceUseCase: IGetEventAttendanceUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { eventId } = req.params;
    const hostId = (req as CustomRequest).user.id;

    const request = {
      eventId,
      hostId,
    };

    const response = await this.getEventAttendanceUseCase.execute(request);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: response,
      message: SUCCESS_MESSAGES.ATTENDANCE_RETRIEVED,
    });
  }
}
