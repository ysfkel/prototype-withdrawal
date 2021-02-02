import {CommonRoutesConfig} from './routes.config';
import WithdrawalController from '../controllers/withdrawal';
import UserController from '../controllers/user'
import WithdrawalService from '../services/withdrawal/withdrawal';
import UserService from '../services/user/user'
import DenominationRepository from '../repository/denomination';
import UserRepository from '../repository/user';

import { Application } from 'express';

export class WithdrawalRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'Withdraw');
    }

    configureRoutes() {
        const service  = new WithdrawalService(new DenominationRepository(), new UserRepository())
        const controller = new WithdrawalController(service)

        const userService  = new UserService(new UserRepository())
        const userCcontroller = new UserController(userService)

        this.app.route(`/withdraw/:amount`)
            .get(controller.withdraw) 
        this.app.route(`/account/balance`)
            .get(userCcontroller.getAccountBalance) 
 
        return this.app;
    }
}