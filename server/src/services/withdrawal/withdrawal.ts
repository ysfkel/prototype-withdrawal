
import {IDenominationRepository} from "../../repository/denomination";
import { IUserRepository } from '../../repository/user'
import { getInsufficientBalanceData, getValues , getDenominationAmount, getCurrencyDenomination} from "./helper";
import { Withdrawal, DenominationAmount } from "./dto";
import { NOTE, LARGE, SMALL } from "../../repository/data";
import {quickSort } from '../../utils/utils'
import { Denomination } from "../../models/denomination";

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


/**
 * 
 * @param withdrawalAmount //amount that customer wants to withdraw
 * @param denominations // list of available denominatons
 * @param accountBalance  //customers account balance
 */
const processWithdrawal = (withdrawalAmount: number, denominations: Array<Denomination>, accountBalance: number): Withdrawal => {

    let ca: DenominationAmount = {
        amount: 0,
        next: withdrawalAmount,
    }
  
    let total = 0
  
    //initialize withdrawal object
   const withdrawal: Withdrawal =  {
       notes:{
          items: [],
          total:0
       },
       largeCoins:{
          items: [],
          total:0
       },
       smallCoins:{
          items: [],
          total:0
       },
       grandTotal:0,
       accountBalance: accountBalance,
       insufficientBalance: false
   }
  
   //get the integer values for each denomition in the list
   const notes =  getValues(denominations.filter(x=>x.Type===NOTE))
   //get the integer values for each denomition in the list
   const largeCoins =  getValues(denominations.filter(x=>x.Type===LARGE))
   //get the integer values for each denomition in the list
   const smallCoins =  getValues(denominations.filter(x=>x.Type===SMALL))
   //sorts the denomination values
   let money = quickSort([...smallCoins,...largeCoins, ...notes])
  
    while(total < withdrawalAmount) {
  
            let currencyDenomination = getCurrencyDenomination(money, ca.next )
            ca = getDenominationAmount(currencyDenomination,ca.next )
  
            if(notes.includes(currencyDenomination)) {
                //update total 
                withdrawal.notes.total += (currencyDenomination*ca.amount)
                //push item
                withdrawal.notes.items.push({
                    denomination: currencyDenomination,
                    amount: ca.amount
                })
            } else if(largeCoins.includes(currencyDenomination)) {
              //update total 
              withdrawal.largeCoins.total += (currencyDenomination*ca.amount)
              //push item
                withdrawal.largeCoins.items.push({
                    denomination: currencyDenomination,
                    amount: ca.amount
                })
            } else {
              //update total
              withdrawal.smallCoins.total += (currencyDenomination*ca.amount)
              //push item
               withdrawal.smallCoins.items.push({
                    denomination: currencyDenomination,
                    amount: ca.amount
                })
            }
        total += currencyDenomination * ca.amount  
    }
  
    //calculate grand total
    withdrawal.grandTotal += withdrawal.notes.total + withdrawal.largeCoins.total + withdrawal.smallCoins.total 
  
    return withdrawal 
  }
