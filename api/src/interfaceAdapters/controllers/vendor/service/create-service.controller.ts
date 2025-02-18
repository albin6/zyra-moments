import { Request, Response } from "express";
import { ICreateServiceController } from "../../../../entities/controllerInterfaces/vendor/service/create-service-controller.interface";
import { ICreateServiceUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/create-service-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
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
    try {
      const vendorId = (req as CustomRequest).user.id;
      const serviceData = req.body as IServiceEntity;

      await this.createServiceUseCase.execute({ vendorId, ...serviceData });

      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, message: SUCCESS_MESSAGES.CREATED });
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
