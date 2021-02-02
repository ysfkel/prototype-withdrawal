import * as express from 'express';
import { IUserService } from '../services/user/user';

export default class UserController {

    service: IUserService

    constructor(service: IUserService) {
        this.service = service
    }

    getAccountBalance = async (req: express.Request, res: express.Response) => {

        let userID: 10009029992 

       const accountBalance = await this.service.getAccountBalance(userID)

        res.status(200).send({
            accountBalance: accountBalance
        });
    }

}

