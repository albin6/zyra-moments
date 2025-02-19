import { Request, Response } from "express";

export interface IGetVendorProfileDetailsController {
  handle(req: Request, res: Response): Promise<void>;
}
