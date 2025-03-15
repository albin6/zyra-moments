import { inject, injectable } from "tsyringe";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { ICancelTicketUseCase } from "../../../entities/useCaseInterfaces/event/ticket/cancel-ticket-usecase.interface";

@injectable()
export class CancelTicketUseCase implements ICancelTicketUseCase {
    constructor(@inject("ITicketRepository") private ticketRepository: ITicketRepository) {}
    async execute(ticketId: any): Promise<void> {
        await this.ticketRepository.findByIdAndCancel(ticketId)
    }
}