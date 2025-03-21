import { inject, injectable } from "tsyringe";
import { ITicketRepository } from "../../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { ICancelTicketUseCase } from "../../../entities/useCaseInterfaces/event/ticket/cancel-ticket-usecase.interface";
import { CustomError } from "../../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface";
import { IPaymentRepository } from "../../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { IPaymentService } from "../../../entities/services/payement-service.interface";

@injectable()
export class CancelTicketUseCase implements ICancelTicketUseCase {
  constructor(
    @inject("ITicketRepository") private ticketRepository: ITicketRepository,
    @inject("IWalletRepository") private walletRepository: IWalletRepository,
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository,
    @inject("IPaymentService") private paymentService: IPaymentService,
  ) {}
  async execute(ticketId: any): Promise<void> {
    const ticket = await this.ticketRepository.findByIdAndCancel(ticketId);

    if (!ticket) {
      throw new CustomError(
        ERROR_MESSAGES.TICKET_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    console.log('ticket of the pament',ticket)

    const payment = await this.paymentRepository.findById(ticket.paymentId)

    if (payment && payment.paymentIntentId && payment.status === "succeeded") {
      await this.paymentService.refundPayment(payment.paymentIntentId);
    }

    const populatedTicket =
      await this.ticketRepository.findByIdAndPopulateEvent(ticket._id);

    await Promise.all([
      await this.walletRepository.findWalletByUserIdAndUpdateBalanceAndAddPaymentId(
        ticket.userId,
        populatedTicket.eventId.pricePerTicket,
        ticket.paymentId
      ),
      await this.walletRepository.findWalletByUserIdAndUpdateBalanceForCancel(
        "67cef9adee1eeefc92f10237" as string,
        populatedTicket.eventId.pricePerTicket * -1,
      ),
    ]);
  }
}
