import "reflect-metadata";
import "./frameworks/di/index";
import "./frameworks/di/resolver";
import { MongoConnect } from "./frameworks/database/mongoDB/mongoConnect";
import { Server } from "./frameworks/http/server";
import { config } from "./shared/config";

const server = new Server();
const mongoConnect = new MongoConnect();

mongoConnect.connectDB();

server
  .getApp()
  .listen(config.server.PORT, () =>
    console.log(`Server is running on http://localhost:${config.server.PORT}`)
  );
