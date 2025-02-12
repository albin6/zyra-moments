import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IWorkSampleRepository {
  create(data: IWorkSampleEntity): Promise<void>;
}
