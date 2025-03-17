import { Request, Response } from "express";
import { ICreateServiceController } from "../../../../entities/controllerInterfaces/vendor/service/create-service-controller.interface";
import { ICreateServiceUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/create-service-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";
import { CustomRequest } from "../../../middlewares/auth.middleware";
import { IServiceEntity } from "../../../../entities/models/service.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateServiceController implements ICreateServiceController {
  constructor(
    @inject("ICreateServiceUseCase")
    private createServiceUseCase: ICreateServiceUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const vendorId = (req as CustomRequest).user.id;
    const serviceData = req.body as IServiceEntity;

    await this.createServiceUseCase.execute({ vendorId, ...serviceData });

    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: SUCCESS_MESSAGES.CREATED });
  }
}
