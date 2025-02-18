import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";
import { VerifyOTPController } from "../../interfaceAdapters/controllers/auth/verify-otp.controllers";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controllers";
import { LogoutUserController } from "../../interfaceAdapters/controllers/auth/logout.controllers";
import { GetAllCategoriesController } from "../../interfaceAdapters/controllers/common/get-all-categories.controllers";
import { CreateNewCategoryController } from "../../interfaceAdapters/controllers/admin/create-new-category.controllers";
import { JoinCategoryController } from "../../interfaceAdapters/controllers/vendor/join-category-request.controllers";
import { GetAllUsersController } from "../../interfaceAdapters/controllers/admin/get-all-users.controllers";
import { GetVendorDetailsController } from "../../interfaceAdapters/controllers/vendor/get-vendor-details.controllers";
import { GetAllCategoryJoinRequestController } from "../../interfaceAdapters/controllers/admin/get-all-category-join-request.controllers";
import { GetClientDetailsConrtoller } from "../../interfaceAdapters/controllers/client/get-client-details.controllers";
import { UpdateClientPasswordController } from "../../interfaceAdapters/controllers/client/update-client-password.controllers";
import { UpdateVendorPasswordController } from "../../interfaceAdapters/controllers/vendor/update-vendor-password.controllers";
import { UpdateUserStatusController } from "../../interfaceAdapters/controllers/admin/update-user-status.controllers";
import { GetAllPaginatedCategoryController } from "../../interfaceAdapters/controllers/admin/get-all-paginated-category.controllers";
import { CreateWorkSampleController } from "../../interfaceAdapters/controllers/vendor/create-work-sample.controllers";
import { GetAllWorkSampleByVendorIdController } from "../../interfaceAdapters/controllers/vendor/get-all-work-sample-by-vendorid.controller";
import { UpdateVendorProfileController } from "../../interfaceAdapters/controllers/vendor/update-vendor-profile.controller";
import { UpdateClientProfileController } from "../../interfaceAdapters/controllers/client/update-client-profile.controller";
import { GetVendorCategoryJoinRequestStatusController } from "../../interfaceAdapters/controllers/vendor/get-vendor-category-join-request-status.controller";
import { UpdateCategoryStatusController } from "../../interfaceAdapters/controllers/admin/update-category-status.controller";
import { UpdateCategoryRequestStatusController } from "../../interfaceAdapters/controllers/admin/update-category-request-status.controller";
import { BlockedStatusMiddleware } from "../../interfaceAdapters/middlewares/block-status.middleware";
import { GetWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/get-work-sample-by-id.controller";
import { UpdateWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/update-work-sample-by-id.controller";
import { DeleteWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/delete-work-sample-by-id.controller";
import { CreateServiceController } from "../../interfaceAdapters/controllers/vendor/service/create-service.controller";
import { GetAllServicesByVendorIdController } from "../../interfaceAdapters/controllers/vendor/service/get-all-services-by-vendor-id.controller";
import { GetServiceDetailsByIdController } from "../../interfaceAdapters/controllers/vendor/service/get-service-details-by-id.controller";
import { UpdateServiceByIdController } from "../../interfaceAdapters/controllers/vendor/service/update-service-by-id.controller";
import { GetVendorsUnderCategoryController } from "../../interfaceAdapters/controllers/client/get-vendors-under-category.controller";

DependencyInjection.registerAll();

export const blockStatusMiddleware = container.resolve(BlockedStatusMiddleware);

export const registerController = container.resolve(RegisterUserController);

export const loginController = container.resolve(LoginUserController);

export const sendEmailController = container.resolve(SendEmailController);

export const veryfyOTPController = container.resolve(VerifyOTPController);

export const refreshTokenController = container.resolve(RefreshTokenController);

export const logoutUserController = container.resolve(LogoutUserController);

export const joinCategoryController = container.resolve(JoinCategoryController);

export const getAllUsersController = container.resolve(GetAllUsersController);

export const getAllCategoriesController = container.resolve(
  GetAllCategoriesController
);

export const createNewCategoryController = container.resolve(
  CreateNewCategoryController
);

export const getVendorDetailsController = container.resolve(
  GetVendorDetailsController
);

export const getAllCategoryJoinRequestController = container.resolve(
  GetAllCategoryJoinRequestController
);

export const getClientDetailsController = container.resolve(
  GetClientDetailsConrtoller
);

export const updateClientPasswordController = container.resolve(
  UpdateClientPasswordController
);

export const updateVendorPasswordController = container.resolve(
  UpdateVendorPasswordController
);

export const updateUserStatusController = container.resolve(
  UpdateUserStatusController
);

export const getAllPaginatedCategoryController = container.resolve(
  GetAllPaginatedCategoryController
);

export const createWorkSampleController = container.resolve(
  CreateWorkSampleController
);

export const getAllWorkSampleByVendorIdController = container.resolve(
  GetAllWorkSampleByVendorIdController
);

export const getWorkSampleByIdController = container.resolve(
  GetWorkSampleByIdController
);

export const updateWorkSampleByIdController = container.resolve(
  UpdateWorkSampleByIdController
);

export const deleteWorkSampleByIdController = container.resolve(
  DeleteWorkSampleByIdController
);

export const updateVendorProfileController = container.resolve(
  UpdateVendorProfileController
);

export const updateClientProfileController = container.resolve(
  UpdateClientProfileController
);

export const getVendorCategoryJoinRequestStatusController = container.resolve(
  GetVendorCategoryJoinRequestStatusController
);

export const updateCategoryStatusController = container.resolve(
  UpdateCategoryStatusController
);

export const updateCategoryRequestStatusController = container.resolve(
  UpdateCategoryRequestStatusController
);

export const createServiceController = container.resolve(
  CreateServiceController
);

export const getAllServicesByVendorIdController = container.resolve(
  GetAllServicesByVendorIdController
);

export const getServiceDetailsByIdController = container.resolve(
  GetServiceDetailsByIdController
);

export const updateServiceByIdController = container.resolve(
  UpdateServiceByIdController
);

export const getVendorsUnderCategoryController = container.resolve(
  GetVendorsUnderCategoryController
);
