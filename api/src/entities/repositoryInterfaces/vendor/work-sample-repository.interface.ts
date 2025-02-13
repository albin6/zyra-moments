import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IWorkSampleRepository {
  create(data: IWorkSampleEntity): Promise<void>;
  findAllByVendorId(
    vendorId: any,
    skip: number,
    limit: number
  ): Promise<{
    workSamples: Pick<
      IWorkSampleEntity,
      "_id" | "title" | "description" | "images"
    >[];
    total: number;
  }>;
}
