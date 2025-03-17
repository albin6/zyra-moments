import { Request, Response } from "express";
import { IGetServiceDetailsByIdController } from "../../../../entities/controllerInterfaces/vendor/service/get-service-details-by-id-controller.interface";
import { IGetServiceDetailsByIdUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/get-service-details-by-id-usecase.interface";
import { HTTP_STATUS } from "../../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetServiceDetailsByIdController
  implements IGetServiceDetailsByIdController
{
  constructor(
    @inject("IGetServiceDetailsByIdUseCase")
    private getServiceDetailsByIdUseCase: IGetServiceDetailsByIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const serviceId = req.params.serviceId;

    if (!serviceId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Service ID is required",
      });
      return;
    }

    const service = await this.getServiceDetailsByIdUseCase.execute(serviceId);

    res.status(HTTP_STATUS.OK).json({ success: true, service });
  }
}
