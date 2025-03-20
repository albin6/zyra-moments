import { Request, Response } from "express";
import { IGetAllBookingController } from "../../../entities/controllerInterfaces/booking/get-all-booking-controller.inteface";
import { IGetAllBookingUseCase } from "../../../entities/useCaseInterfaces/booking/get-all-booking-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllBookingController implements IGetAllBookingController {
  constructor(
    @inject("IGetAllBookingUseCase")
    private getAllBookingUseCase: IGetAllBookingUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10, search = "", sortBy = "newest" } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const searchTermString = typeof search === "string" ? search : "";
    const sortByString = typeof sortBy === "string" ? sortBy : "";

    console.log('inside get all booking controller =>')

    const { bookings, total } = await this.getAllBookingUseCase.execute(
      pageNumber,
      pageSize,
      sortByString,
      searchTermString
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      bookings,
      totalPages: total,
      currentPage: pageNumber,
    });
  }
}
