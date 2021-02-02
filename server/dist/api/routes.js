"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalRoutes = void 0;
const routes_config_1 = require("./routes.config");
const withdrawal_1 = require("../controllers/withdrawal");
const user_1 = require("../controllers/user");
const withdrawal_2 = require("../services/withdrawal/withdrawal");
const user_2 = require("../services/user/user");
const denomination_1 = require("../repository/denomination");
const user_3 = require("../repository/user");
class WithdrawalRoutes extends routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'Withdraw');
    }
    configureRoutes() {
        const service = new withdrawal_2.default(new denomination_1.default(), new user_3.default());
        const controller = new withdrawal_1.default(service);
        const userService = new user_2.default(new user_3.default());
        const userCcontroller = new user_1.default(userService);
        this.app.route(`/withdraw/:amount`)
            .get(controller.withdraw);
        this.app.route(`/account/balance`)
            .get(userCcontroller.getAccountBalance);
        return this.app;
    }
}
exports.WithdrawalRoutes = WithdrawalRoutes;
//# sourceMappingURL=routes.js.map