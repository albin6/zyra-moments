import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

import { config } from "../../shared/config";

export class Server {
  private _app: Application;
  constructor() {
    dotenv.config();
    this._app = express();
  }

  configureMiddlewares() {
    this._app.use(
      cors({
        origin: config.cors.ALLOWED_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
  }
}
