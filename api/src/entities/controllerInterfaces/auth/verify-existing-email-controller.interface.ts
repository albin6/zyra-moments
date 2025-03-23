import { Request, Response } from "express";

export interface IVerifyExistingEmailController {
  handle(req: Request, res: Response): Promise<void>;
}
