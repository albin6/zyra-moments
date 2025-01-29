import { Request, Response } from "express";
import { IRegisterUserController } from "../../../entities/controllerInterfaces/auth/register.controller.inteface";
import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/register.usecase.inteface";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "./validation/user.schema";
import { inject, injectable } from "tsyringe";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";

@injectable()
export class RegisterUserController implements IRegisterUserController {
  constructor(
    @inject("IRegisterUserUseCase")
    private registerUserUseCase: IRegisterUserUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { role } = req.body as UserDTO;

    const schema = userSchemas[role];

    if (!schema) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    const validatedData = schema.parse(req.body);
    await this.registerUserUseCase.execute(validatedData);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS });
    try {
    } catch (error) {
      console.log(error);
    }
  }
}
