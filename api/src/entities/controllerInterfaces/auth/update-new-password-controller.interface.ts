import { Request, Response } from "express";

export interface IUpdateNewPasswordController {
  handle(req: Request, res: Response): Promise<void>;
}
