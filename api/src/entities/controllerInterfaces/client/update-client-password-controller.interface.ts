import { Request, Response } from "express";

export interface IUpdateClientPasswordController {
  handle(req: Request, res: Response): Promise<void>;
}
