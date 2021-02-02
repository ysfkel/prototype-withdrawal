"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class WithdrawalController {
    constructor(service) {
        this.withdraw = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const param = req.params.amount;
            let amount = parseInt(param);
            if (isNaN(amount)) {
                res.status(400).send("Invalid amount");
                return;
            }
            const withdrawal = yield this.service.withdraw(amount);
            res.status(200).send(withdrawal);
        });
        this.service = service;
    }
}
exports.default = WithdrawalController;
//# sourceMappingURL=withdrawal.js.map