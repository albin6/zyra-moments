import { Request, Response } from "express";
import { IGetAllServicesForBookingController } from "../../../entities/controllerInterfaces/client/get-all-services-for-booking-controller.interface";
import { IGetAllServicesForBookingUseCase } from "../../../entities/useCaseInterfaces/client/get-all-services-for-booking-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllServicesForBookingController
  implements IGetAllServicesForBookingController
{
  constructor(
    @inject("IGetAllServicesForBookingUseCase")
    private getAllServicesForBookingUseCase: IGetAllServicesForBookingUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { vendorId } = req.query;
      const response: IServiceEntity[] =
        await this.getAllServicesForBookingUseCase.execute(vendorId);

      res.status(HTTP_STATUS.OK).json({ success: true, services: response });
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
