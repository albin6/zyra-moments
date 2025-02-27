import { Request, Response } from "express";
import { IGetAllBookingForVendorController } from "../../../entities/controllerInterfaces/booking/get-all-booking-for-vendor-controller.interface";
import { IGetAllBookingForVendorUseCase } from "../../../entities/useCaseInterfaces/booking/get-all-booking-for-vendor-usecase.interface";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllBookingForVendorController
  implements IGetAllBookingForVendorController
{
  constructor(
    @inject("IGetAllBookingForVendorUseCase")
    private getAllBookingForVendorUseCase: IGetAllBookingForVendorUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "newest",
      } = req.query;
      const clientId = (req as CustomRequest).user.id;

      const pageNumber = Number(page);
      const pageSize = Number(limit);
      const searchTermString = typeof search === "string" ? search : "";
      const sortByString = typeof sortBy === "string" ? sortBy : "";

      const { bookings, total } =
        await this.getAllBookingForVendorUseCase.execute(
          clientId,
          pageNumber,
          pageSize,
          searchTermString,
          sortByString
        );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        bookings,
        totalPages: total,
        currentPage: pageNumber,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.VALIDATION_ERROR,
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
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
