/*
Find a duplicate, Space Edition™.

We have an array of integers, where:

The integers are in the range 1..n. The array has a length of n+1. It
follows that our array has at least one integer which appears at least twice.
But it may have several duplicates, and each duplicate may appear more than
twice.

Write a function which finds an integer that appears more than once in our
array. Don't modify the input! (If there are multiple duplicates, you only need
to find one of them.)

We're going to run this function on our new, super-hip MacBook Pro With Retina
Display™. Thing is, the damn thing came with the RAM soldered right to the
motherboard, so we can't upgrade our RAM. So we need to optimize for space!
*/

// Time: O(n)
// Space: O(n)
export const findDupSpaceEdNaiive = (list: number[]): number => {
    const seen = new Set<number>();

    for (let i = 0; i < list.length; i++) {
        const curNum = list[i];

        if (seen.has(curNum)) {
            return curNum;
        }

        seen.add(curNum);
    }
};

// Time: O(n lg n)
// Space: O(1)
export default (list: number[]): number => {
    let floor = 1;
    let ceiling = list.length - 1;

    while (floor < ceiling) {
        const midpoint = Math.floor(floor + (ceiling - floor) / 2);
        const leftFloor = floor;
        const leftCeiling = midpoint;
        const rightFloor = midpoint + 1;
        const rightCeiling = ceiling;
        const maxPossibleItemsInLeft = leftCeiling - leftFloor + 1;

        // Walk through the entire list and see how many items are actually in
        // the left range
        let itemsInLeft = 0;
        list.forEach((item) => {
            if (item >= leftFloor && item <= leftCeiling) {
                itemsInLeft++;
            }
        });

        // If we have more items that belong in the left side than possible, we know the duplicate is in the left side
        if (itemsInLeft > maxPossibleItemsInLeft) {
            floor = leftFloor;
            ceiling = leftCeiling;
        }

        // Otherwise, the duplicate(s) are in the right side
        else {
            floor = rightFloor;
            ceiling = rightCeiling;
        }
    }

    return floor;
};
