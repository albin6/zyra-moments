import { Request, Response } from "express";
import { IRegisterUserController } from "../../../entities/controllerInterfaces/auth/register.controller.inteface";
import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/register.usecase.inteface";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "./validation/user.schema";
import { inject, injectable } from "tsyringe";

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
      res.status(400).json({ error: "Invalid role" });
    }

    const validatedData = schema.parse(req.body);
    await this.registerUserUseCase.execute(validatedData);
    try {
    } catch (error) {
      console.log(error);
    }
  }
}
