"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsufficientBalanceData = exports.processWithdrawal = void 0;
const utils_1 = require("../../utils/utils");
const data_1 = require("../../repository/data");
/**
 * Users binary search to find the correct currency denomination
 * @param arr currency deominsations list
 * @param n withdrwal amount
 */
const getCurrencyDenomination = (arr = [], n) => {
    let mid = Math.floor((arr.length / 2));
    if (arr.length === 1) {
        return arr[mid];
    }
    if (arr[mid] === n) {
        return arr[mid];
    }
    if (arr[mid] < n) {
        return getCurrencyDenomination(arr.slice(mid), n);
    }
    else {
        return getCurrencyDenomination(arr.slice(0, mid), n);
    }
};
/**
 * calculates the amount of the currency denomination to add to the withdrwal
 * returns the amount and the remaining amount to withdraw
 * @param currencyDenomination
 * @param withdrawalAmount
 */
const getDenominationAmount = (currencyDenomination, withdrawalAmount) => {
    let remainder = withdrawalAmount % currencyDenomination;
    let amount = (withdrawalAmount - remainder) / currencyDenomination;
    return {
        amount: amount,
        next: remainder // next withdrwal amount to calculate
    };
};
/**
 *
 * @param withdrawalAmount //amount that customer wants to withdraw
 * @param denominations // list of available denominatons
 * @param accountBalance  //customers account balance
 */
const processWithdrawal = (withdrawalAmount, denominations, accountBalance) => {
    let ca = {
        amount: 0,
        next: withdrawalAmount,
    };
    let total = 0;
    //initialize withdrawal object
    const withdrawal = {
        notes: {
            items: [],
            total: 0
        },
        largeCoins: {
            items: [],
            total: 0
        },
        smallCoins: {
            items: [],
            total: 0
        },
        grandTotal: 0,
        accountBalance: accountBalance,
        insufficientBalance: false
    };
    //get the integer values for each denomition in the list
    const notes = getValues(denominations.filter(x => x.Type === data_1.NOTE));
    //get the integer values for each denomition in the list
    const largeCoins = getValues(denominations.filter(x => x.Type === data_1.LARGE));
    //get the integer values for each denomition in the list
    const smallCoins = getValues(denominations.filter(x => x.Type === data_1.SMALL));
    //sorts the denomination values
    let money = utils_1.quickSort([...smallCoins, ...largeCoins, ...notes]);
    while (total < withdrawalAmount) {
        let currencyDenomination = getCurrencyDenomination(money, ca.next);
        ca = getDenominationAmount(currencyDenomination, ca.next);
        if (notes.includes(currencyDenomination)) {
            //update total 
            withdrawal.notes.total += (currencyDenomination * ca.amount);
            //push item
            withdrawal.notes.items.push({
                denomination: currencyDenomination,
                amount: ca.amount
            });
        }
        else if (largeCoins.includes(currencyDenomination)) {
            //update total 
            withdrawal.largeCoins.total += (currencyDenomination * ca.amount);
            //push item
            withdrawal.largeCoins.items.push({
                denomination: currencyDenomination,
                amount: ca.amount
            });
        }
        else {
            //update total
            withdrawal.smallCoins.total += (currencyDenomination * ca.amount);
            //push item
            withdrawal.smallCoins.items.push({
                denomination: currencyDenomination,
                amount: ca.amount
            });
        }
        total += currencyDenomination * ca.amount;
    }
    //calculate grand total
    withdrawal.grandTotal += withdrawal.notes.total + withdrawal.largeCoins.total + withdrawal.smallCoins.total;
    return withdrawal;
};
exports.processWithdrawal = processWithdrawal;
const getValues = (denominations) => {
    return denominations.map(d => d.Value);
};
const getInsufficientBalanceData = (accountBalance) => {
    const data = {
        items: [],
        total: 0
    };
    const insufficientBalance = {
        notes: data,
        largeCoins: data,
        smallCoins: data,
        grandTotal: 0,
        accountBalance: accountBalance,
        insufficientBalance: true
    };
    return insufficientBalance;
};
exports.getInsufficientBalanceData = getInsufficientBalanceData;
//# sourceMappingURL=helper.js.map