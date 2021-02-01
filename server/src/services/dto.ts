


export interface WithdrawalItem {
    denomination: string
    amount: number
}

export interface Withdrawal {
    notes: Array<WithdrawalItem> 
    largeCoins:  Array<WithdrawalItem> 
    smallCoins: Array<WithdrawalItem> 
}
