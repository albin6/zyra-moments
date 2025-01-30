import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { DependencyInjection } from ".";

DependencyInjection.registerAll();

export const registerController = container.resolve(RegisterUserController);
export const loginController = container.resolve(LoginUserController);
export const registerUserUseCase = container.resolve<IRegisterUserUseCase>(
  "IRegisterUserUseCase"
);
