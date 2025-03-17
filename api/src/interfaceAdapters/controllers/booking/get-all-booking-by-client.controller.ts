import { Request, Response } from "express";
import { IGetAllBookingByClientController } from "../../../entities/controllerInterfaces/booking/get-all-booking-by-cliient-controller.interface";
import { IGetAllBookingByClientUseCase } from "../../../entities/useCaseInterfaces/booking/get-all-booking-by-client-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllBookingByClientController
  implements IGetAllBookingByClientController
{
  constructor(
    @inject("IGetAllBookingByClientUseCase")
    private getAllBookingByClientUseCase: IGetAllBookingByClientUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10, search = "", sortBy = "newest" } = req.query;
    const vendorId = (req as CustomRequest).user.id;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const searchTermString = typeof search === "string" ? search : "";
    const sortByString = typeof sortBy === "string" ? sortBy : "";

    const { bookings, total } = await this.getAllBookingByClientUseCase.execute(
      vendorId,
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
  }
}
