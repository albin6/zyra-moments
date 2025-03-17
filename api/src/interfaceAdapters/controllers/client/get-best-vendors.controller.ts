import { Request, Response } from "express";
import { IGetBestVendorsController } from "../../../entities/controllerInterfaces/client/get-best-vendors-controller.interface";
import { IGetBestVendorsUseCase } from "../../../entities/useCaseInterfaces/client/get-best-vendors-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetBestVendorsController implements IGetBestVendorsController {
  constructor(
    @inject("IGetBestVendorsUseCase")
    private getBestVendorUseCase: IGetBestVendorsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const bestVendors = await this.getBestVendorUseCase.execute();
    res.status(HTTP_STATUS.OK).json({ success: true, vendors: bestVendors });
  }
}
