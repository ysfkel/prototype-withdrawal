
import {IDenominationRepository} from "../repository/denomination";
import { processWithdrawal } from "./helper";
import { Withdrawal } from "./dto";

export interface IWithdrawalService {
    withdraw(amount: number): Promise<Withdrawal> 
}

export default class WithdrawalService implements IWithdrawalService{

    repo: IDenominationRepository

    constructor(repo: IDenominationRepository) {
         this.repo = repo;
    }
 
    async withdraw(amount: number): Promise<Withdrawal>  {

        const denominations = await this.repo.get()

        const  withdrawal = processWithdrawal(amount, denominations) 

    
        return  withdrawal
    } 

}
