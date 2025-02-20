import { Request, Response } from "express";

export interface IGetAllServicesForBookingController {
  handle(req: Request, res: Response): Promise<void>;
}
