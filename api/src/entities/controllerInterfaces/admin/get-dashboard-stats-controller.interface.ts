import { Request, Response } from "express";

export interface IGetDashboardStatsController {
  handle(req: Request, res: Response): Promise<void>;
}
