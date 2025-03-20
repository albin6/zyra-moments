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
    searchTerm: string
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

    let sortOptions = {};
    switch (sortBy) {
      case "price-asc":
        sortOptions = { totalPrice: 1 };
        break;
      case "price-desc":
        sortOptions = { totalPrice: -1 };
        break;
      case "date-asc":
        sortOptions = { bookingDate: 1 };
        break;
      case "date-desc":
        sortOptions = { bookingDate: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    console.log('inside get all booking usecase => ', filter, skip, limit, sortBy)

    const { bookings, total } = await this.bookingRepository.find(
      filter,
      sortOptions,
      skip,
      limit
    );

    return {
      bookings,
      total: Math.ceil(total / validPageSize),
    };
  }
}
