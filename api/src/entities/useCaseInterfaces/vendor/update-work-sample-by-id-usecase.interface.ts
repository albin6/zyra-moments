import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IUpdateWorkSampleByIdUseCase {
  execute(id: any, data: Partial<IWorkSampleEntity>): Promise<void>;
}
