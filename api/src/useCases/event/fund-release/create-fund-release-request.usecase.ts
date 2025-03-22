import { inject, injectable } from "tsyringe";
import { IFundReleaseRequestEntity } from "../../../entities/models/fund-release-request.entity";
import { IFundReleaseRequestRepository } from "../../../entities/repositoryInterfaces/event/fund-release-request-repository.interface";
import { ICreateFundReleaseRequestUseCase } from "../../../entities/useCaseInterfaces/event/fund-release/create-fund-release-request-usecase.interface";
import { generateRandomUUID } from "../../../frameworks/security/randomid.bcrypt";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IEventRepository } from "../../../entities/repositoryInterfaces/event/event-repository.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class CreateFundReleaseRequestUseCase
  implements ICreateFundReleaseRequestUseCase
{
  constructor(
    @inject("IFundReleaseRequestRepository")
    private fundReleaseRequestRepository: IFundReleaseRequestRepository,
    @inject("ITicketRepository") private ticketRepository: ITicketRepository,
    @inject("IEventRepository") private eventRepository: IEventRepository
  ) {}
  async execute(
    eventId: string,
    organizerId: string,
    message: string
  ): Promise<IFundReleaseRequestEntity> {
    const purchasedTicket =
      await this.ticketRepository.findActiveTicketsByEventId(eventId);

    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new CustomError(ERROR_MESSAGES.WRONG_ID, HTTP_STATUS.BAD_REQUEST);
    }

    const ticketSalesCount = purchasedTicket.length;
    const totalAmount = event.pricePerTicket * ticketSalesCount;
    
    const request: IFundReleaseRequestEntity = {
      requestId: generateRandomUUID(),
      eventId: eventId as any,
      organizerId: organizerId as any,
      totalAmount,
      ticketSalesCount,
      status: "PENDING",
      requestedAt: new Date(),
      adminNotes: message,
    };

    return await this.fundReleaseRequestRepository.create(request);
  }
}
