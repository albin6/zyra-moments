import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
  googleController,
  loginController,
  registerController,
  sendEmailController,
  updateNewPasswordController,
  verifyExistingEmailController,
  veryfyOTPController,
} from "../../di/resolver";
import { asyncHandler } from "../../../shared/async-handler";

export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/register",
      asyncHandler(registerController.handle.bind(registerController))
    );

    this.router.post(
      "/login",
      asyncHandler(loginController.handle.bind(loginController))
    );

    this.router.post(
      "/google-auth",
      asyncHandler(googleController.handle.bind(googleController))
    );

    this.router.post(
      "/send-otp",
      asyncHandler(sendEmailController.handle.bind(sendEmailController))
    );

    this.router.post(
      "/verify-otp",
      asyncHandler(veryfyOTPController.handle.bind(veryfyOTPController))
    );

    this.router.post(
      "/verify-email",
      asyncHandler(
        verifyExistingEmailController.handle.bind(verifyExistingEmailController)
      )
    );

    this.router.patch(
      "/password",
      asyncHandler(
        updateNewPasswordController.handle.bind(updateNewPasswordController)
      )
    );
  }
}
