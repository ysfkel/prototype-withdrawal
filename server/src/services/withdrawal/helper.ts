import { Withdrawal, DenominationAmount } from './dto'
import { Denomination } from "../../models/denomination";

/**
 * Users binary search to find the correct currency denomination
 * @param arr currency deominsations list
 * @param n withdrwal amount
 */
export const getCurrencyDenomination = (arr: Array<number>=[], n: number) => {


    let mid = Math.floor((arr.length/2))

    if(arr.length===1) {
      return arr[mid]
    }

     if(arr[mid]===n) {
         return arr[mid]
     }

     if(arr[mid]<n) {

         return getCurrencyDenomination(arr.slice(mid), n)
     } else {
          return getCurrencyDenomination(arr.slice(0, mid), n)
     }
  
}

/**
 * calculates the amount of the currency denomination to add to the withdrwal
 * returns the amount and the remaining amount to withdraw
 * @param currencyDenomination 
 * @param withdrawalAmount 
 */
export const getDenominationAmount = (currencyDenomination: number, withdrawalAmount: number): DenominationAmount => {
  let remainder = withdrawalAmount % currencyDenomination 
  let amount = (withdrawalAmount-remainder) / currencyDenomination

  return {
      amount:amount,
      next: remainder // next withdrwal amount to calculate
  }
}



export const getValues = (denominations: Array<Denomination>) => {

    return denominations.map(d => d.Value)

}



export const getInsufficientBalanceData = (accountBalance: number): Withdrawal=> { 

    const data = {
        items: [],
        total: 0
    }

    const insufficientBalance: Withdrawal  = {
        notes: data,
        largeCoins:  data,
        smallCoins: data,
        grandTotal: 0,
        accountBalance: accountBalance,
        insufficientBalance: true
    }

    return insufficientBalance

}
 