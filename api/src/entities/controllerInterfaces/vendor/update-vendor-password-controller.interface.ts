import { Request, Response } from "express";

export interface IUpdateVendorPasswordController {
  handle(req: Request, res: Response): Promise<void>;
}
