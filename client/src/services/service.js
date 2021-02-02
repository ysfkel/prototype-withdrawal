

import axios from 'axios'


export const withdraw = async (amount) => {
     
    try {
        const withdrawal = await axios.get(`http://localhost:9000/withdraw/${amount}`)
        return withdrawal
    } catch(e) {
        throw e
    }
}

export const getAccountBalance = async () => {
     
    try {
        const balance = await axios.get(`http://localhost:9000/account/balance`)
        return balance
    } catch(e) {
        throw e
    }
}