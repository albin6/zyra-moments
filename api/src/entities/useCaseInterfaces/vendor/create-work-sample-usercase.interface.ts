import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface ICreateWorkSampleUseCase {
  execute(data: IWorkSampleEntity): Promise<void>;
}
