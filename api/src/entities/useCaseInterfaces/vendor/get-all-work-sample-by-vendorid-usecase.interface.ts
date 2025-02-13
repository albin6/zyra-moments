import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IGetAllWorkSampleByVendorIdUseCase {
  execute(
    vendorId: any
  ): Promise<
    Pick<IWorkSampleEntity, "_id" | "title" | "description" | "images">[]
  >;
}
