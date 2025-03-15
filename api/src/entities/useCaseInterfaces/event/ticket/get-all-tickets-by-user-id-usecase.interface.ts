import { PaginatedTicket } from "../../../models/paginated-ticket..entity";

export interface IGetAllTicketsByUserIdUseCase {
  execute(
    userId: any,
    pageNumber: number,
    pageSize: number
  ): Promise<PaginatedTicket>;
}
