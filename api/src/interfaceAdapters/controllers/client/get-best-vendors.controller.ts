import { Request, Response } from "express";
import { IGetBestVendorsController } from "../../../entities/controllerInterfaces/client/get-best-vendors-controller.interface";
import { IGetBestVendorsUseCase } from "../../../entities/useCaseInterfaces/client/get-best-vendors-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetBestVendorsController implements IGetBestVendorsController {
  constructor(
    @inject("IGetBestVendorsUseCase")
    private getBestVendorUseCase: IGetBestVendorsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const bestVendors = await this.getBestVendorUseCase.execute();
      res.status(HTTP_STATUS.OK).json({ success: true, vendors: bestVendors });
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
