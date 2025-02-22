import { Request, Response } from "express";

export interface IGetAllBookingByClientController {
  handle(req: Request, res: Response): Promise<void>;
}
