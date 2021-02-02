export interface IUserRepository {
     getAccountBalance: () => Promise<number>
     updateUserBalance: (newBalance: number) => Promise<number> 
}

let fakeUserAccountBalance = 100000

export default class UserRepository implements IUserRepository {

    getAccountBalance = (): Promise<number> => {
        
         return new Promise<number> ((resolve, reject) => {
            resolve(fakeUserAccountBalance)
         })
     }

     updateUserBalance = (newBalance): Promise<number> => {

        fakeUserAccountBalance = newBalance
        
        return new Promise<number> ((resolve, reject) => {
           resolve(fakeUserAccountBalance)
        })
    }
 
}
