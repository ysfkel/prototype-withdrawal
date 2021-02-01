import { Denomination } from "../models/denomination";

export const NOTE: string = "NOTE"
export const SMALL: string = "SMALL-COINS"
export const LARGE: string = "LARGE-COIN"

export const getData = ():Array<Denomination> => {

     let denominations: Array<Denomination> = [
         {
           Type: NOTE ,
           Value: 50
         },
         {
            Type: NOTE ,
            Value: 100
          },
          {
            Type: NOTE ,
            Value: 200
          }, {
            Type: NOTE ,
            Value: 500
          },
          //large coins
          {
            Type: LARGE ,
            Value: 2
          },
          {
            Type: LARGE ,
            Value: 5
          }, {
            Type: LARGE ,
            Value: 20
          },
          //small coins
          {
            Type: SMALL ,
            Value: 1
          }, {
            Type: SMALL ,
            Value: 10
          },
     ]     

      return denominations
}