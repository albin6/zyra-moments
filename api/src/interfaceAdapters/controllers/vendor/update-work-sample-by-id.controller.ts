import { Request, Response } from "express";
import { IUpdateWorkSampleByIdController } from "../../../entities/controllerInterfaces/vendor/update-work-sample-by-id-controller.interface";
import { IUpdateWorkSampleByIdUseCase } from "../../../entities/useCaseInterfaces/vendor/update-work-sample-by-id-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
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
  }
}
