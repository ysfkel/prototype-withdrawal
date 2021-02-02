
import {IDenominationRepository} from "../../repository/denomination";
import { IUserRepository } from '../../repository/user'
import { processWithdrawal, getInsufficientBalanceData } from "./helper";
import { Withdrawal } from "./dto";

export interface IWithdrawalService {
    withdraw(amount: number): Promise<Withdrawal> 
}

export default class WithdrawalService implements IWithdrawalService{

    repo: IDenominationRepository
    userRepo: IUserRepository

    constructor(repo: IDenominationRepository, userRepo: IUserRepository) {
         this.repo = repo;
         this.userRepo = userRepo

    }
 
    async withdraw(amount: number): Promise<Withdrawal>  {

        const accountBalance = await this.userRepo.getAccountBalance()
        //check if user has sufficient balance
        if(accountBalance < amount) return getInsufficientBalanceData(accountBalance)
        //update user balance
        let newBalance = accountBalance - amount;

        //real database operation will have exception handling here
        this.userRepo.updateUserBalance(newBalance)
        //retrieve currency denomination data 
        const denominations = await this.repo.get()
        //dispatch withdrawal
        const  withdrawal = processWithdrawal(amount, denominations, newBalance) 

    
        return  withdrawal
    } 

}
