
import {quickSort } from '../../utils/utils'
import { Withdrawal, DenominationAmount } from './dto'
import { Denomination } from "../../models/denomination";
import { NOTE, LARGE, SMALL } from "../../repository/data";


const  getCurrencyDenomination = (arr: Array<number>=[], n: number) => {


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

const getDenominationAmount = (currencyDenomination: number, withdrawalAmount: number): DenominationAmount => {
  let remainder = withdrawalAmount % currencyDenomination 
  let amount = (withdrawalAmount-remainder) / currencyDenomination

  return {
      amount:amount,
      next: remainder
  }
}

export const processWithdrawal = (withdrawalAmount: number, denominations: Array<Denomination>, accountBalance: number): Withdrawal => {

  let ca: DenominationAmount = {
      amount: 0,
      next: withdrawalAmount,
  }

  let total = 0

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

 const notes =  getValues(denominations.filter(x=>x.Type===NOTE))

 const largeCoins =  getValues(denominations.filter(x=>x.Type===LARGE))

 const smallCoins =  getValues(denominations.filter(x=>x.Type===SMALL))
 
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

const getValues = (denominations: Array<Denomination>) => {

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
 