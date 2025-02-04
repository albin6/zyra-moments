import { Request, Response } from "express";

export interface IVendorCategoryRequestStatusController {
  handle(req: Request, res: Response): Promise<void>;
}
