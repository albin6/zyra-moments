import { Request, Response } from "express";
import { IUpdateServiceByIdController } from "../../../../entities/controllerInterfaces/vendor/service/update-service-by-id-controller.interface";
import { IUpdateServiceByIdUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/update-service-by-id-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";
import { IServiceEntity } from "../../../../entities/models/service.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateServiceByIdController
  implements IUpdateServiceByIdController
{
  constructor(
    @inject("IUpdateServiceByIdUseCase")
    private updateSericeByIdUseCase: IUpdateServiceByIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const serviceId = req.params.serviceId;
    const service = req.body as IServiceEntity;

    await this.updateSericeByIdUseCase.execute(serviceId, service);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
