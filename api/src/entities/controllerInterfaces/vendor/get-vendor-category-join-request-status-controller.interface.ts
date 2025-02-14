import { Request, Response } from "express";

export interface IGetVendorCategoryJoinRequestStatusController {
  handle(req: Request, res: Response): Promise<void>;
}
