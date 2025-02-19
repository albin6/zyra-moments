import { Request, Response } from "express";

export interface IGetBestVendorsController {
  handle(req: Request, res: Response): Promise<void>;
}
