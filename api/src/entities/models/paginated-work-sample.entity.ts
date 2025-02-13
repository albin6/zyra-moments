import { IWorkSampleEntity } from "./work-sample.entity";

export interface PaginatedWorkSample {
  workSamples:
    | Pick<IWorkSampleEntity, "_id" | "title" | "description" | "images">[]
    | [];
  total: number;
}
