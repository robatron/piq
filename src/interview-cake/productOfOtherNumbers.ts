/*
You have an array of integers, and for each index you want to find the product
of every integer except the integer at that index.

Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of
integers and returns an array of the products.

For example, given:

    [1, 7, 3, 4]

your function would return:

    [84, 12, 28, 21]

by calculating:

    [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]

Here's the catch: **You can't use division in your solution!**

https://www.interviewcake.com/question/javascript/product-of-other-numbers
*/

// Time: O(2n) = O(n), space: O(n)
export default (list: number[]): number[] => {
    const products: number[] = new Array(list.length);

    if (list.length < 2) {
        throw new Error('List must be >= 2');
    }

    // Get all products to the left of the current index
    let toLeftSoFar = 1;
    for (let i = 0; i < list.length; i++) {
        products[i] = toLeftSoFar;
        toLeftSoFar = toLeftSoFar * list[i];
    }

    // Get all products to the right of the current index and multiply them with
    // all the products to the left and save them back to the allocated array
    let toRightSoFar = 1;
    for (let i = list.length - 1; i >= 0; i--) {
        products[i] = products[i] * toRightSoFar;
        toRightSoFar = toRightSoFar * list[i];
    }

    return products;
};
