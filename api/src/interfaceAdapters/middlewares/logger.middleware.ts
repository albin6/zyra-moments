import { injectable, inject } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ILogger } from '../services/logger/logger.interface';

@injectable()
export class LoggerMiddleware {
  constructor(@inject('ILogger') private logger: ILogger) {}

  public handle(req: Request, res: Response, next: NextFunction): void {
    this.logger.info('In logger =>', {
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });
    next();
  }
}