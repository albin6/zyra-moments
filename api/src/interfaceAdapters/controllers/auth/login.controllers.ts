import { Request, Response } from "express";
import { ILoginUserController } from "../../../entities/controllerInterfaces/auth/login-controller.interface";
import { ILoginUserUseCase } from "../../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { inject, injectable } from "tsyringe";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { LoginUserDTO } from "../../../shared/dtos/user.dto";
import { loginSchema } from "./validation/user-login-validation.schema";
import { CustomError } from "../../../entities/utils/CustomError";
import { ZodError } from "zod";

@injectable()
export class LoginUserController implements ILoginUserController {
  constructor(
    @inject("ILoginUserUseCase") private loginUserUseCase: ILoginUserUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginUserDTO;

      console.log(data);

      const validatedData = loginSchema.parse(data);

      if (!validatedData) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
      }

      const user = await this.loginUserUseCase.execute(validatedData);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
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
