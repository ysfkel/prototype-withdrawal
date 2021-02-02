"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
class DenominationRepository {
    constructor() {
        this.get = () => {
            return new Promise((resolve, reject) => {
                resolve(data_1.getData());
            });
        };
    }
}
exports.default = DenominationRepository;
//# sourceMappingURL=denomination.js.map