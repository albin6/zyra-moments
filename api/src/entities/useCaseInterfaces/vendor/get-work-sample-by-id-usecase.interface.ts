import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IGetWorkSampleByIdUseCase {
  execute(
    id: any
  ): Promise<Pick<
    IWorkSampleEntity,
    "_id" | "title" | "description" | "images"
  > | null>;
}
