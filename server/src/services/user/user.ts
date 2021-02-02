
import { IUserRepository } from '../../repository/user'  

export interface IUserService {
    getAccountBalance(userId: number): Promise<number> 
}

export default class UserService implements IUserService{

    userRepo: IUserRepository

    constructor(userRepo: IUserRepository) {
         this.userRepo = userRepo
    }
 
    async getAccountBalance(userId: number): Promise<number>  {

        const accountBalance = await this.userRepo.getAccountBalance()
    
        return  accountBalance
    } 

}
