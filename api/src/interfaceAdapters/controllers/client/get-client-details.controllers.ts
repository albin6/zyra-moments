import { Request, Response } from "express";
import { IGetClientDetailsController } from "../../../entities/controllerInterfaces/client/get-client-details-controller.interface";
import { IGetClientDetailsUseCase } from "../../../entities/useCaseInterfaces/client/get-client-details-usecase.interface";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { HTTP_STATUS } from "../../../shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetClientDetailsConrtoller implements IGetClientDetailsController {
  constructor(
    @inject("IGetClientDetailsUseCase")
    private getClientDetailsUseCase: IGetClientDetailsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const id = (req as CustomRequest).user.id;
      const client = await this.getClientDetailsUseCase.execute(id);

      res.status(HTTP_STATUS.OK).json({ success: true, client });
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
