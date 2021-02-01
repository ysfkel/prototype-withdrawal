import express from 'express';
import { IWithdrawalService } from '../services/withdrawal-service';

export default class WithdrawalController {

    service: IWithdrawalService

    constructor(service: IWithdrawalService) {
        this.service = service
    }

    withdraw = async (req: express.Request, res: express.Response) => {

        const param = req.params.amount 

        let amount: number = parseInt(param)

        if(isNaN(amount)) {
           res.status(400).send("Invalid amount")
           return
        } 

       const withdrawal = await this.service.withdraw(amount)

        res.status(200).send(withdrawal);
    }

}

