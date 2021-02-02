"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fakeUserAccountBalance = 100000;
class UserRepository {
    constructor() {
        this.getAccountBalance = () => {
            return new Promise((resolve, reject) => {
                resolve(fakeUserAccountBalance);
            });
        };
        this.updateUserBalance = (newBalance) => {
            fakeUserAccountBalance = newBalance;
            return new Promise((resolve, reject) => {
                resolve(fakeUserAccountBalance);
            });
        };
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.js.map