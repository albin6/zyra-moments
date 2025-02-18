import { Request, Response } from "express";

export interface IGetAllServicesByVendorIdController {
  handle(req: Request, res: Response): Promise<void>;
}
