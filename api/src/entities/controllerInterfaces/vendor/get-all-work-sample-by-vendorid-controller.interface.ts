import { Request, Response } from "express";

export interface IGetAllWorkSampleByVendorIdController {
  handle(req: Request, res: Response): Promise<void>;
}
