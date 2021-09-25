/*
I have an array of n+1 numbers. Every number in the range 1..n appears
once except for one number that appears twice.

Write a function for finding the number that appears twice.

https://www.interviewcake.com/question/javascript/which-appears-twice?course=fc1&section=combinatorics-probability-math
*/
const throwErr = (msg) => {
    throw new Error(msg);
};
const throwListTooSmall = () =>
    throwErr(`A list of < 2 items cannot contain repeats`);

const throwListNotTriangularSeries = ({ item, n }) =>
    throwErr(
        `List is not a triangular series! Item ${item} is out of range 1 .. ${n}`,
    );

export const findRepeat = (list: number[]): number => {
    if (list?.length < 2) {
        throwListTooSmall();
    }

    // What would the sum be if there were no repeats? Since 1..n is a
    // triangular series, we can use a known equation to calculate the total.
    const n = list.length - 1;
    const expectedSum = (Math.pow(n, 2) + n) / 2;

    // What's the actual sum of all the items?
    const actualSum = list.reduce((sum, item) => {
        if (item < 1 || item >= list.length) {
            throwListNotTriangularSeries({ item, n });
        }

        return sum + item;
    }, 0);

    // The repeated number can be found simply by subtracting the expected sum
    // with the actual sum
    return actualSum - expectedSum;
};

// Find `expected` in `actual` reduce loop (my original solution)
export const findRepeatLoop = (list: number[]): number => {
    if (list?.length < 2) {
        throwListTooSmall();
    }

    // What's the actual sum of all the items? Just sum the items in a loop.
    let actualSum = 0;

    // What would we expect the sum be if there were no repeats? It would be 1 +
    // 2 + .. + n - 1, where n is the list length *with* the repeat. Since array
    // indexes start at 0 and end at n - 1, we can just sum all the indexes of
    // the list to get our expected sum.
    let expectedSum = 0;

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        // Can't determine repeats if the list contains unexpected items
        if (item < 1 || item >= list.length) {
            throwListNotTriangularSeries({ item, n: list.length - 1 });
        }

        expectedSum += i;
        actualSum += item;
    }

    // The repeated number can be found simply by subtracting the expected sum
    // with the actual sum
    return actualSum - expectedSum;
};

export default {
    findRepeat,
    findRepeatLoop,
};
