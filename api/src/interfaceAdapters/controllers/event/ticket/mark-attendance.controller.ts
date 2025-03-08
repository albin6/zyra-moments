import { Request, Response } from "express";
import { IMarkAttendanceController } from "../../../../entities/controllerInterfaces/event/ticket/mark-attendance-controller.interface";
import { IMarkAttendanceUseCase } from "../../../../entities/useCaseInterfaces/event/ticket/mark-attendance-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../../middlewares/auth.middleware";

@injectable()
export class MarkAttendanceController implements IMarkAttendanceController {
  constructor(
    @inject("IMarkAttendanceUseCase")
    private markAttendanceUseCase: IMarkAttendanceUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { qrCode } = req.body;
      const userId = (req as CustomRequest).user.id;

      const result = await this.markAttendanceUseCase.execute(userId, qrCode);

      if (result.success) {
        res.status(HTTP_STATUS.OK).json(result);
      } else {
        res.status(HTTP_STATUS.BAD_REQUEST).json(result);
      }
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
