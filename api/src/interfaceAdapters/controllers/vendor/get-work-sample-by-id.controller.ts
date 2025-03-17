import { Request, Response } from "express";
import { IGetWorkSampleByIdController } from "../../../entities/controllerInterfaces/vendor/get-work-sample-by-id-controller.interface";
import { IGetWorkSampleByIdUseCase } from "../../../entities/useCaseInterfaces/vendor/get-work-sample-by-id-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetWorkSampleByIdController
  implements IGetWorkSampleByIdController
{
  constructor(
    @inject("IGetWorkSampleByIdUseCase")
    private getWorkSampleByIdUseCase: IGetWorkSampleByIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const workSampleId = req.params.id as any;

    if (!workSampleId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Work Sample ID is required",
      });
      return;
    }

    const workSample = await this.getWorkSampleByIdUseCase.execute(
      workSampleId
    );

    res.status(HTTP_STATUS.OK).json({ success: true, workSample });
  }
}
