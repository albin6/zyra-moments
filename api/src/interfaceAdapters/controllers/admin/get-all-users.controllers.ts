import { Request, Response } from "express";
import { IGetAllUsersController } from "../../../entities/controllerInterfaces/admin/get-all-users-controller.interface";
import { IGetAllUsersUseCase } from "../../../entities/useCaseInterfaces/admin/get-all-users-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllUsersController implements IGetAllUsersController {
  constructor(
    @inject("IGetAllUsersUseCase")
    private getAllUsersUseCase: IGetAllUsersUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userType = req.query.userType as string;
      const users = await this.getAllUsersUseCase.execute(userType);

      res.status(HTTP_STATUS.OK).json({ success: true, users });
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
