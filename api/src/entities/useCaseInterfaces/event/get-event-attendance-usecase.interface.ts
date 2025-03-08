import {
  GetEventAttendanceRequest,
  GetEventAttendanceResponse,
} from "../../models/attendance.entity";

export interface IGetEventAttendanceUseCase {
  execute(
    request: GetEventAttendanceRequest
  ): Promise<GetEventAttendanceResponse>;
}
