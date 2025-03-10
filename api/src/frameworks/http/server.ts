import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express, { Application } from "express";

import { config } from "../../shared/config";
import { AuthRoutes } from "../routes/auth/auth.route";
import { PrivateRoutes } from "../routes/common/private.route";
import { errorHandler } from "../../interfaceAdapters/middlewares/error.middleware";
import { dataParser } from "../../interfaceAdapters/middlewares/data-parser.middleware";
import { notFound } from "../../interfaceAdapters/middlewares/not-found.middleware";

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

    this._app.use(dataParser);

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

    this._app.use("*", notFound);
  }

  private configureErrorHandling(): void {
    this._app.use(errorHandler);
  }

  public getApp(): Application {
    return this._app;
  }
}
