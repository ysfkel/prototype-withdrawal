


export interface WithdrawalItem {
    denomination: string
    amount: number
}

export interface DenominationDTO {
    items: Array<WithdrawalItem> 
    total: number
}

export interface Withdrawal {
    notes: DenominationDTO
    largeCoins:  DenominationDTO
    smallCoins: DenominationDTO
    grandTotal: number
    accountBalance: number
    insufficientBalance: boolean
}

export interface DenominationAmount {
    amount: number
    next: number
}
