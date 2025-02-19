import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";
import { VerifyOTPController } from "../../interfaceAdapters/controllers/auth/verify-otp.controllers";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controllers";
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
import { GetVendorProfileDetailsController } from "../../interfaceAdapters/controllers/client/get-vendor-profile-details.controller";
import { GetBestVendorsController } from "../../interfaceAdapters/controllers/client/get-best-vendors.controller";

export class ControllerRegistry {
  static registerControllers(): void {
    container.register(BlockedStatusMiddleware, {
      useClass: BlockedStatusMiddleware,
    });

    container.register("RegisterUserController", {
      useClass: RegisterUserController,
    });

    container.register("LoginUserController", {
      useClass: LoginUserController,
    });

    container.register("SendEmailController", {
      useClass: SendEmailController,
    });

    container.register("VerifyOTPController", {
      useClass: VerifyOTPController,
    });

    container.register("RefreshTokenController", {
      useClass: RefreshTokenController,
    });

    container.register("GetAllCategoriesController", {
      useClass: GetAllCategoriesController,
    });

    container.register("CreateNewCategoryController", {
      useClass: CreateNewCategoryController,
    });

    container.register("JoinCategoryController", {
      useClass: JoinCategoryController,
    });

    container.register("GetAllUsersController", {
      useClass: GetAllUsersController,
    });

    container.register("GetVendorDetailsController", {
      useClass: GetVendorDetailsController,
    });

    container.register("GetAllCategoryJoinRequestController", {
      useClass: GetAllCategoryJoinRequestController,
    });

    container.register("GetClientDetailsConrtoller", {
      useClass: GetClientDetailsConrtoller,
    });

    container.register("UpdateClientPasswordController", {
      useClass: UpdateClientPasswordController,
    });

    container.register("UpdateVendorPasswordController", {
      useClass: UpdateVendorPasswordController,
    });

    container.register("UpdateUserStatusController", {
      useClass: UpdateUserStatusController,
    });

    container.register("GetAllPaginatedCategoryController", {
      useClass: GetAllPaginatedCategoryController,
    });

    container.register("CreateWorkSampleController", {
      useClass: CreateWorkSampleController,
    });

    container.register("GetAllWorkSampleByVendorIdController", {
      useClass: GetAllWorkSampleByVendorIdController,
    });

    container.register("GetWorkSampleByIdController", {
      useClass: GetWorkSampleByIdController,
    });

    container.register("UpdateWorkSampleByIdController", {
      useClass: UpdateWorkSampleByIdController,
    });

    container.register("DeleteWorkSampleByIdController", {
      useClass: DeleteWorkSampleByIdController,
    });

    container.register("UpdateVendorProfileController", {
      useClass: UpdateVendorProfileController,
    });

    container.register("UpdateClientProfileController", {
      useClass: UpdateClientProfileController,
    });

    container.register("GetVendorCategoryJoinRequestStatusController", {
      useClass: GetVendorCategoryJoinRequestStatusController,
    });

    container.register("UpdateCategoryStatusController", {
      useClass: UpdateCategoryStatusController,
    });

    container.register("UpdateCategoryRequestStatusController", {
      useClass: UpdateCategoryRequestStatusController,
    });

    container.register("CreateServiceController", {
      useClass: CreateServiceController,
    });

    container.register("GetAllServicesByVendorIdController", {
      useClass: GetAllServicesByVendorIdController,
    });

    container.register("GetServiceDetailsByIdController", {
      useClass: GetServiceDetailsByIdController,
    });

    container.register("UpdateServiceByIdController", {
      useClass: UpdateServiceByIdController,
    });

    container.register("GetVendorsUnderCategoryController", {
      useClass: GetVendorsUnderCategoryController,
    });

    container.register("GetVendorProfileDetailsController", {
      useClass: GetVendorProfileDetailsController,
    });

    container.register("GetBestVendorsController", {
      useClass: GetBestVendorsController,
    });
  }
}
