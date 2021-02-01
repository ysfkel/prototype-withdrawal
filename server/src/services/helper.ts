
import {quickSort } from '../utils/utils'
import { Withdrawal } from './dto'
import { Denomination } from "../models/denomination";
import { NOTE, LARGE, SMALL } from "../repository/data";

interface DenominationAmount {
    amount: number
    next: number
}

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

export const processWithdrawal = (withdrawalAmount: number, denominations: Array<Denomination>): Withdrawal => {

  let ca: DenominationAmount = {
      amount: 0,
      next: withdrawalAmount,
  }

  let total = 0

 const withdrawal: Withdrawal =  {
     notes:[],
     largeCoins:[],
     smallCoins:[]
 }

 const notes =  getValues(denominations.filter(x=>x.Type===NOTE))

 const largeCoins =  getValues(denominations.filter(x=>x.Type===LARGE))

 const smallCoins =  getValues(denominations.filter(x=>x.Type===SMALL))
 
 let money = quickSort([...smallCoins,...largeCoins, ...notes])

  while(total < withdrawalAmount) {

          let currencyDenomination = getCurrencyDenomination(money, ca.next )
          ca = getDenominationAmount(currencyDenomination,ca.next )

          if(notes.includes(currencyDenomination)) {
              withdrawal.notes.push({
                  denomination: currencyDenomination,
                  amount: ca.amount
              })
          } else if(largeCoins.includes(currencyDenomination)) {
              withdrawal.largeCoins.push({
                  denomination: currencyDenomination,
                  amount: ca.amount
              })
          } else {
              withdrawal.smallCoins.push({
                  denomination: currencyDenomination,
                  amount: ca.amount
              })
          }
      total += currencyDenomination * ca.amount  
  }

  return withdrawal 
}

const getValues = (denominations: Array<Denomination>) => {

    return denominations.map(d => d.Value)

}