import { Request, Response } from "express";
import { IUpdateServiceByIdController } from "../../../../entities/controllerInterfaces/vendor/service/update-service-by-id-controller.interface";
import { IUpdateServiceByIdUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/update-service-by-id-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
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
    try {
      const serviceId = req.params.serviceId;
      const service = req.body as IServiceEntity;

      await this.updateSericeByIdUseCase.execute(serviceId, service);

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
