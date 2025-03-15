import { inject, injectable } from "tsyringe";
import { PaginatedTicket } from "../../../entities/models/paginated-ticket..entity";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IGetAllTicketsByUserIdUseCase } from "../../../entities/useCaseInterfaces/event/ticket/get-all-tickets-by-user-id-usecase.interface";

@injectable()
export class GetAllTicketsByUserIdUseCase
  implements IGetAllTicketsByUserIdUseCase
{
  constructor(@inject("ITicketRepository") private ticketRepository: ITicketRepository) {}
  async execute(
    userId: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedTicket> {
    const validPageNumber = Math.max(1, pageNumber || 1);
    const validPageSize = Math.max(1, pageSize || 10);
    const skip = (validPageNumber - 1) * validPageSize;
    const limit = validPageSize;

    return await this.ticketRepository.findAllByUserId(userId, skip, limit);
  }
}
