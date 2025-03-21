import { inject, injectable } from "tsyringe";
import { BookingListFromRepo } from "../../entities/models/booking.entity";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { IGetAllBookingUseCase } from "../../entities/useCaseInterfaces/booking/get-all-booking-usecase.interface";

@injectable()
export class GetAllBookingUseCase implements IGetAllBookingUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepository: IBookingRepository
  ) {}
  async execute(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    searchTerm: string,
    statusFilter: string
  ): Promise<BookingListFromRepo> {
    let filter: any = {};

    if (searchTerm) {
      filter.$or = [
        {
          "serviceDetails.serviceTitle": { $regex: searchTerm, $options: "i" },
        },
        {
          "serviceDetails.serviceDescription": {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ];
    }

    console.log('here is the filter =>',filter)
    
    if (statusFilter && statusFilter !== "all") {
      filter.status = statusFilter;
    }

    console.log('here is the filter with status =>',filter)

    let sortOptions: any = {};
    if (sortBy) {
      const isDescending = sortBy.startsWith("-");
      const field = isDescending ? sortBy.slice(1) : sortBy;

      switch (field) {
        case "serviceTitle":
          sortOptions["serviceDetails.serviceTitle"] = isDescending ? -1 : 1;
          break;
        case "clientName":
          sortOptions["userId.firstName"] = isDescending ? -1 : 1;
          break;
        case "vendorName":
          sortOptions["vendorId.firstName"] = isDescending ? -1 : 1;
          break;
        case "bookingDate":
          sortOptions.bookingDate = isDescending ? -1 : 1;
          break;
        case "totalPrice":
          sortOptions.totalPrice = isDescending ? -1 : 1;
          break;
        case "status":
          sortOptions.status = isDescending ? -1 : 1;
          break;
        case "Date:+Newest":
          sortOptions.bookingDate = -1;
          break;
        case "Date:+Oldest":
          sortOptions.bookingDate = 1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    console.log('here is the sortoption =>',sortOptions)

    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    console.log(
      "inside get all booking usecase => ",
      filter,
      skip,
      limit,
      sortBy
    );

    const { bookings, total } = await this.bookingRepository.find(
      filter,
      sortOptions,
      skip,
      limit
    );

    return {
      bookings,
      total,
    };
  }
}
