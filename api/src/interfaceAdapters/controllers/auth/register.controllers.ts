import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "./validation/user-signup-validation.schema";
import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { IRegisterUserController } from "../../../entities/controllerInterfaces/auth/register-controller.inteface";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { ZodError } from "zod";

@injectable()
export class RegisterUserController implements IRegisterUserController {
  constructor(
    @inject("IRegisterUserUseCase")
    private registerUserUseCase: IRegisterUserUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body as UserDTO;

      const schema = userSchemas[role];

      if (!schema) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
        return;
      }

      const validatedData = schema.parse(req.body);

      await this.registerUserUseCase.execute(validatedData);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
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
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
