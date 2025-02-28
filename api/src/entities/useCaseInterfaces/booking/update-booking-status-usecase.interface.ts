export interface IUpdateBookingStatusUseCase {
  execute(bookingId: any, status: string): Promise<void>;
}
