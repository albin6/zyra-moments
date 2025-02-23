import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express, { Application, NextFunction, Request, Response } from "express";
import "reflect-metadata";

import { config } from "../../shared/config";
import { AuthRoutes } from "../routes/auth/auth.route";
import { PrivateRoutes } from "../routes/common/private.route";

export class Server {
  private _app: Application;
  constructor() {
    this._app = express();

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddlewares(): void {
    this._app.use(helmet());

    this._app.use(
      cors({
        origin: config.cors.ALLOWED_ORIGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type", "stripe-signature"],
        credentials: true,
      })
    );

    this._app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.originalUrl.includes("/client/webhook")) {
        express.raw({ type: "application/json" })(req, res, next);
      } else {
        express.json()(req, res, next);
      }
    });

    this._app.use(cookieParser());

    this._app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
      })
    );
  }

  private configureRoutes(): void {
    this._app.use("/api/v_1/auth", new AuthRoutes().router);
    this._app.use("/api/v_1/_pvt", new PrivateRoutes().router);

    this._app.use("*", (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: "Route not found",
      });
    });
  }

  private configureErrorHandling(): void {
    this._app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode: number = err.statusCode || 500;
        const message = err.message || "Internal server error";
        res.status(statusCode).json({
          success: false,
          statusCode,
          message,
        });
      }
    );
  }

  public getApp(): Application {
    return this._app;
  }
}
