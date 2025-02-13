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

export class ControllerRegistry {
  static registerControllers(): void {
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

    container.register("UpdateVendorProfileController", {
      useClass: UpdateVendorProfileController,
    });

    container.register("UpdateClientProfileController", {
      useClass: UpdateClientProfileController,
    });

    container.register("GetVendorCategoryJoinRequestStatusController", {
      useClass: GetVendorCategoryJoinRequestStatusController,
    });
  }
}
