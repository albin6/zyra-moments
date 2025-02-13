import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IWorkSampleRepository {
  create(data: IWorkSampleEntity): Promise<void>;
  findAllByVendorId(
    vendorId: any
  ): Promise<
    Pick<IWorkSampleEntity, "_id" | "title" | "description" | "images">[]
  >;
}
