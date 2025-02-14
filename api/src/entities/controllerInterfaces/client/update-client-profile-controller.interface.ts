import { Request, Response } from "express";

export interface IUpdateClientProfileController {
  handle(req: Request, res: Response): Promise<void>;
}
