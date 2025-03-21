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
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "",
      statusFilter = "",
    } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const searchTermString = typeof search === "string" ? search : "";
    const sortString = typeof sort === "string" ? sort : "";
    const statusFilterString =
      typeof statusFilter === "string"
        ? statusFilter === "all"
          ? ""
          : statusFilter
        : "";
    console.log("inside get all booking controller =>");

    const { bookings, total } = await this.getAllBookingUseCase.execute(
      pageNumber,
      pageSize,
      sortString,
      searchTermString,
      statusFilterString
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / pageSize),
      currentPage: pageNumber,
    });
  }
}
