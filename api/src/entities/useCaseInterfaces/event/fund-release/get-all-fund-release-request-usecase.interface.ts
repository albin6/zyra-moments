import { IFundReleaseRequestEntity } from "../../../models/fund-release-request.entity";

export interface IGetAllFundReleaseRequestUseCase {
  execute(): Promise<IFundReleaseRequestEntity[]>;
}
