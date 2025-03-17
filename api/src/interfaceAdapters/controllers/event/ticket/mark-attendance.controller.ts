import { Request, Response } from "express";
import { IMarkAttendanceController } from "../../../../entities/controllerInterfaces/event/ticket/mark-attendance-controller.interface";
import { IMarkAttendanceUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/mark-attendance-usecase.interface";
import { HTTP_STATUS } from "../../../../shared/constants";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../../middlewares/auth.middleware";

@injectable()
export class MarkAttendanceController implements IMarkAttendanceController {
  constructor(
    @inject("IMarkAttendanceUseCase")
    private markAttendanceUseCase: IMarkAttendanceUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { qrCode } = req.body;
    const userId = (req as CustomRequest).user.id;

    const result = await this.markAttendanceUseCase.execute(userId, qrCode);

    if (result.success) {
      res.status(HTTP_STATUS.OK).json(result);
    } else {
      res.status(HTTP_STATUS.BAD_REQUEST).json(result);
    }
  }
}
