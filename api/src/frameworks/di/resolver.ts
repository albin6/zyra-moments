import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { DependencyInjection } from ".";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";

DependencyInjection.registerAll();

export const registerController = container.resolve(RegisterUserController);
export const loginController = container.resolve(LoginUserController);
export const sendEmailController = container.resolve(SendEmailController);
