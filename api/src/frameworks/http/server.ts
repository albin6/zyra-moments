import cors from "cors";
import http from "http";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express, { Application } from "express";

import { AuthRoutes } from "../routes/auth/auth.route";
import { PrivateRoutes } from "../routes/common/private.route";
import { dataParser } from "../../interfaceAdapters/middlewares/data-parser.middleware";
import { notFound } from "../../interfaceAdapters/middlewares/not-found.middleware";
import { ChatRoutes } from "../routes/chat/chat.route";
import {
  chatController,
  injectedErrorMiddleware,
  injectedLoggerMiddleware,
} from "../di/resolver";
import { corsOptions } from "../../interfaceAdapters/middlewares/cors-options";

export class Server {
  private _app: Application;
  private _server: http.Server;
  constructor() {
    this._app = express();
    this._server = http.createServer(this._app);

    this.configureMiddlewares();
    this.configureSocketIO();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddlewares(): void {
    this._app.use(helmet());

    this._app.use(cors(corsOptions));

    this._app.use(dataParser);

    this._app.use(
      injectedLoggerMiddleware.handle.bind(injectedLoggerMiddleware)
    );

    this._app.use(cookieParser());

    this._app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
      })
    );
  }

  private configureSocketIO(): void {
    chatController.initialize(this._server);
  }

  private configureRoutes(): void {
    this._app.use("/api/v_1/auth", new AuthRoutes().router);
    this._app.use("/api/v_1/_pvt", new PrivateRoutes().router);
    this._app.use("/api/v_1/_chat", new ChatRoutes().router);

    this._app.use("*", notFound);
  }

  private configureErrorHandling(): void {
    this._app.use(
      injectedErrorMiddleware.handleError.bind(injectedErrorMiddleware)
    );
  }

  public getApp(): Application {
    return this._app;
  }

  public getServer(): http.Server {
    return this._server;
  }
}
