import { IFundReleaseRequestEntity } from "../../../models/fund-release-request.entity";

export interface ICreateFundReleaseRequestUseCase {
  execute(
    eventId: string,
    organizerId: string,
    message: string
  ): Promise<IFundReleaseRequestEntity>;
}
