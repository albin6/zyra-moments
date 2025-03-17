import { Request, Response } from "express";
import { IGetAllServicesByVendorIdController } from "../../../../entities/controllerInterfaces/vendor/service/get-all-services-by-vendor-id-controller.interface";
import { IGetAllServicesByVendorIdUseCase } from "../../../../entities/useCaseInterfaces/vendor/service/get-all-services-by-vendor-id-usecase.interface";
import { HTTP_STATUS } from "../../../../shared/constants";
import { CustomRequest } from "../../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllServicesByVendorIdController
  implements IGetAllServicesByVendorIdController
{
  constructor(
    @inject("IGetAllServicesByVendorIdUseCase")
    private getAllServicesByVendorIdUseCase: IGetAllServicesByVendorIdUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const vendorId = (req as CustomRequest).user.id;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const { services, total, all } =
      await this.getAllServicesByVendorIdUseCase.execute(
        vendorId,
        pageNumber,
        pageSize
      );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      services,
      totalPages: total,
      currentPage: pageNumber,
      all,
    });
  }
}
