import { Request, Response } from "express";

export interface IUpdateVendorProfileController {
  handle(req: Request, res: Response): Promise<void>;
}
