import { Request, Response } from "express";
import { IUpdateWorkSampleByIdController } from "../../../entities/controllerInterfaces/vendor/update-work-sample-by-id-controller.interface";
import { IUpdateWorkSampleByIdUseCase } from "../../../entities/useCaseInterfaces/vendor/update-work-sample-by-id-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IWorkSampleEntity } from "../../../entities/models/work-sample.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateWorkSampleByIdController
  implements IUpdateWorkSampleByIdController
{
  constructor(
    @inject("IUpdateWorkSampleByIdUseCase")
    private updateWorkSampleByIdUseCase: IUpdateWorkSampleByIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const workSampleId = req.params.id as any;
      const data = req.body as Partial<IWorkSampleEntity>;

      if (!workSampleId) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Work Sample ID is required",
        });
        return;
      }

      await this.updateWorkSampleByIdUseCase.execute(workSampleId, data);

      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
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
