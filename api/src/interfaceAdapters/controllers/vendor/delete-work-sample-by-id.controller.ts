import { inject, injectable } from "tsyringe";
import { IDeleteWorkSampleByIdController } from "../../../entities/controllerInterfaces/vendor/delete-work-sample-by-id-controller.interface";
import { IDeleteWorkSampleByIdUseCase } from "../../../entities/useCaseInterfaces/vendor/delete-work-sample-by-id-usecase.interface";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";

@injectable()
export class DeleteWorkSampleByIdController
  implements IDeleteWorkSampleByIdController
{
  constructor(
    @inject("IDeleteWorkSampleByIdUseCase")
    private deleteWorkSampleByIdUseCase: IDeleteWorkSampleByIdUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const workSampleId = req.params.id as any;

      if (!workSampleId) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Work Sample ID is required",
        });
        return;
      }

      await this.deleteWorkSampleByIdUseCase.execute(workSampleId);

      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.DELETE_SUCCESS });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
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
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
}
