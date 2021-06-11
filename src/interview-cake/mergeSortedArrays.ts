/*
In order to win the prize for most cookies sold, my friend Alice and I are going
to merge our Girl Scout Cookies orders and enter as one unit.

Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a
function to merge our arrays of orders into one sorted array.

For example:

    const myArray = [3, 4, 6, 10, 11, 15];
    const alicesArray = [1, 5, 8, 12, 14, 19];

    console.log(mergeArrays(myArray, alicesArray));

Would log [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]

https://www.interviewcake.com/question/javascript/merge-sorted-arrays
*/

export default (arr1: number[], arr2: number[]): number[] => {
    // Final array. This will take O(n) space (arr1.length + arr2.length)
    const sortedArray: number[] = [];

    let i1 = 0;
    let i2 = 0;

    // Walk through the entirety of each array once. This will take O(n) time
    while (i1 < arr1.length && i2 < arr2.length) {
        const a1 = arr1[i1];
        const a2 = arr2[i2];

        if (a1 < a2) {
            sortedArray.push(a1);
            i1++;
        } else if (a1 > a2) {
            sortedArray.push(a2);
            i2++;
        } else {
            sortedArray.push(a1, a2);
            i1++;
            i2++;
        }
    }

    while (i1 < arr1.length) {
        sortedArray.push(arr1[i1]);
        i1++;
    }

    while (i2 < arr2.length) {
        sortedArray.push(arr2[i2]);
        i2++;
    }

    return sortedArray;
};
