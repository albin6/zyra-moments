import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { DependencyInjection } from ".";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";
import { VerifyOTPController } from "../../interfaceAdapters/controllers/auth/verify-otp.controllers";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controllers";
import { LogoutUserController } from "../../interfaceAdapters/controllers/auth/logout.controllers";
import { GetAllCategoriesController } from "../../interfaceAdapters/controllers/common/get-all-categories.controllers";
import { CreateNewCategoryController } from "../../interfaceAdapters/controllers/admin/create-new-category.controllers";
import { JoinCategoryController } from "../../interfaceAdapters/controllers/vendor/join-category-request.controllers";
import { GetAllUsersController } from "../../interfaceAdapters/controllers/admin/get-all-users.controllers";
import { GetVendorDetailsController } from "../../interfaceAdapters/controllers/vendor/get-vendor-details.controllers";

DependencyInjection.registerAll();

export const registerController = container.resolve(RegisterUserController);
export const loginController = container.resolve(LoginUserController);
export const sendEmailController = container.resolve(SendEmailController);
export const veryfyOTPController = container.resolve(VerifyOTPController);
export const refreshTokenController = container.resolve(RefreshTokenController);
export const logoutUserController = container.resolve(LogoutUserController);
export const getAllCategoriesController = container.resolve(
  GetAllCategoriesController
);
export const createNewCategoryController = container.resolve(
  CreateNewCategoryController
);
export const joinCategoryController = container.resolve(JoinCategoryController);
export const getAllUsersController = container.resolve(GetAllUsersController);
export const getVendorDetailsController = container.resolve(
  GetVendorDetailsController
);
