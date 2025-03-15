export interface ICancelTicketUseCase {
    execute(ticketId: any): Promise<void>
}