import { inject, injectable } from "tsyringe";
import {
  GetEventAttendanceRequest,
  GetEventAttendanceResponse,
} from "../../entities/models/attendance.entity";
import { ITicketRepository } from "../../entities/repositoryInterfaces/event/ticket-repository.interface";
import { IGetEventAttendanceUseCase } from "../../entities/useCaseInterfaces/event/get-event-attendance-usecase.interface";

@injectable()
export class GetEventAttendanceUseCase implements IGetEventAttendanceUseCase {
  constructor(
    @inject("ITicketRepository") private ticketRepository: ITicketRepository
  ) {}
  async execute(
    request: GetEventAttendanceRequest
  ): Promise<GetEventAttendanceResponse> {
    const attendanceData = await this.ticketRepository.getEventAttendance(
      request.eventId,
      request.hostId
    );
    return attendanceData;
  }
}
