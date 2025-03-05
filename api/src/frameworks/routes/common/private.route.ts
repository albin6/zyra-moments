import { BaseRoute } from "../base.route";

import { AdminRoutes } from "../admin/admin.route";
import { ClientRoutes } from "../client/client.route";
import { VendorRoutes } from "../vendor/vendor.route";
import { PaymentRoutes } from "../client/payment.route";
import { HostRoutes } from "../client/host.route";
import { QrRoutes } from "../client/qr.route";

export class PrivateRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.use("/_ad", new AdminRoutes().router);
    this.router.use("/_cl", new ClientRoutes().router);
    this.router.use("/_ve", new VendorRoutes().router);
    this.router.use("/_pmt", new PaymentRoutes().router);
    this.router.use("/_host", new HostRoutes().router);
    this.router.use("_qr", new QrRoutes().router);
  }
}
