import {CommonRoutesConfig} from './routes.config';
import WithdrawalController from '../controllers/withdrawal';
import WithdrawalService from '../services/withdrawal-service';
import DenominationRepository from '../repository/denomination';

import { Application } from 'express';

export class WithdrawalRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'Withdraw');
    }

    configureRoutes() {
        const service  = new WithdrawalService(new DenominationRepository())
        const controller = new WithdrawalController(service)
        this.app.route(`/withdraw/:amount`)
            .get(controller.withdraw) 
 
        return this.app;
    }
}