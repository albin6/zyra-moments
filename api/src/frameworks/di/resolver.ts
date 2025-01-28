import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";

export const registerController = container.resolve(RegisterUserController);
