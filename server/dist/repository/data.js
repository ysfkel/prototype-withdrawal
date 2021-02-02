"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.LARGE = exports.SMALL = exports.NOTE = void 0;
exports.NOTE = "NOTE";
exports.SMALL = "SMALL-COINS";
exports.LARGE = "LARGE-COIN";
const getData = () => {
    let denominations = [
        {
            Type: exports.NOTE,
            Value: 50
        },
        {
            Type: exports.NOTE,
            Value: 100
        },
        {
            Type: exports.NOTE,
            Value: 200
        }, {
            Type: exports.NOTE,
            Value: 500
        },
        //large coins
        {
            Type: exports.LARGE,
            Value: 2
        },
        {
            Type: exports.LARGE,
            Value: 5
        }, {
            Type: exports.LARGE,
            Value: 20
        },
        //small coins
        {
            Type: exports.SMALL,
            Value: 1
        }, {
            Type: exports.SMALL,
            Value: 10
        },
    ];
    return denominations;
};
exports.getData = getData;
//# sourceMappingURL=data.js.map