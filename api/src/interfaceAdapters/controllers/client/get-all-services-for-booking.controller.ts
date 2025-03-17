import { Request, Response } from "express";
import { IGetAllServicesForBookingController } from "../../../entities/controllerInterfaces/client/get-all-services-for-booking-controller.interface";
import { IGetAllServicesForBookingUseCase } from "../../../entities/useCaseInterfaces/client/get-all-services-for-booking-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { ServiceVendorReturn } from "../../../entities/models/service.entity";
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
    const { vendorId } = req.query;
    const response: ServiceVendorReturn =
      await this.getAllServicesForBookingUseCase.execute(vendorId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      services: response.services,
      vendor: response.vendor,
    });
  }
}
