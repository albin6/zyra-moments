import { Request, Response } from "express";
import { ILogoutUserController } from "../../../entities/controllerInterfaces/auth/logout-controller.interface";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { clearAuthCookies } from "../../../shared/utils/cookieHelper";
import { injectable } from "tsyringe";

@injectable()
export class LogoutUserController implements ILogoutUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      clearAuthCookies(res);
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
}
