import { ConnectOpts } from "socket.io-client";

declare module "socket.io-client" {
  interface ConnectOpts {
    withCredentials?: boolean;
  }
}