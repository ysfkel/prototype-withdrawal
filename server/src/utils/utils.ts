

const pivot = (arr: Array<number>, start: number): number => {

    let swap = (arr=[], swapIndex: number, index: number) => {
           let temp = arr[swapIndex]
           arr[swapIndex] = arr[index]
           arr[index] = temp
    }

    let pivot = arr[start] 
    let swapIndex = start

    //loop to swap each item tht is less than the pivot 
    //with the swapIndex
    for(let i = start + 1; i < arr.length; i ++) {
        if(pivot > arr[i]) {
            swapIndex++
            swap(arr, swapIndex, i)
        }
    }

    //finally swap the pivot whith the swapIndex
    swap(arr, start, swapIndex)

    return swapIndex // this will be the correct position of the pivot

}

//time complexiy o(n log n) , first n is because we loop to get the pivot
export const quickSort = (arr: Array<number>, left: number=0, right: number=arr.length-1): Array<number> => {
  
     if(left < right) {
        let pivotIndex = pivot(arr, left)
        //left
        quickSort(arr,left, pivotIndex-1)
        //right
        quickSort(arr,pivotIndex+1, right)
     }
   
     return arr

}