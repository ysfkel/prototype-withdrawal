import { Denomination } from "../models/denomination";
import { getData } from "./data";

export interface IDenominationRepository {
     get: () => Promise<Array<Denomination>>
}


export default class DenominationRepository implements IDenominationRepository {

     get = (): Promise<Array<Denomination>> => {
        
         return new Promise<Array<Denomination>> ((resolve, reject) => {
            resolve(getData())
         })
     }
 
}
