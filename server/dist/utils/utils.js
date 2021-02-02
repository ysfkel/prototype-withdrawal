"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickSort = void 0;
const pivot = (arr, start) => {
    let swap = (arr = [], swapIndex, index) => {
        let temp = arr[swapIndex];
        arr[swapIndex] = arr[index];
        arr[index] = temp;
    };
    let pivot = arr[start];
    let swapIndex = start;
    //loop to swap each item tht is less than the pivot 
    //with the swapIndex
    for (let i = start + 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            swapIndex++;
            swap(arr, swapIndex, i);
        }
    }
    //finally swap the pivot whith the swapIndex
    swap(arr, start, swapIndex);
    return swapIndex; // this will be the correct position of the pivot
};
//time complexiy o(n log n) , first n is because we loop to get the pivot
const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
        let pivotIndex = pivot(arr, left);
        //left
        exports.quickSort(arr, left, pivotIndex - 1);
        //right
        exports.quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
};
exports.quickSort = quickSort;
//# sourceMappingURL=utils.js.map