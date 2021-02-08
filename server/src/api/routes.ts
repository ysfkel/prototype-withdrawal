import {CommonRoutesConfig} from './routes.config';
import WithdrawalController from '../controllers/withdrawal';
import UserController from '../controllers/user'
import { Application } from 'express';

export class WithdrawalRoutes extends CommonRoutesConfig {
    withdrawal: WithdrawalController
    user: UserController

    constructor(app: Application, withdrawal: WithdrawalController, user: UserController) {
        super(app, 'Withdraw');
        this.user = user 
        this.withdrawal = withdrawal
    }

    configureRoutes() {
   
        this.app.route(`/withdraw/:amount`)
            .get(this.withdrawal.withdraw) 
        this.app.route(`/account/balance`)
            .get(this.user.getAccountBalance) 
 
        return this.app;
    }
}