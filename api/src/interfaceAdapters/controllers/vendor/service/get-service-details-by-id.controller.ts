import { Request, Response } from "express";
import { IGetServiceDetailsByIdController } from "../../../../entities/controllerInterfaces/vendor/service/get-service-details-by-id-controller.interface";
import { IGetServiceDetailsByIdUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/get-service-details-by-id-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../../shared/constants";
import { CustomError } from "../../../../entities/utils/CustomError";
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
    try {
      const serviceId = req.params.serviceId;

      if (!serviceId) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Service ID is required",
        });
        return;
      }

      const service = await this.getServiceDetailsByIdUseCase.execute(
        serviceId
      );

      res.status(HTTP_STATUS.OK).json({ success: true, service });
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
