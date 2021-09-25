/*
Suppose we had an array of nn integers sorted in ascending order. How quickly
could we check if a given integer is in the array?

https://www.interviewcake.com/question/javascript/find-in-ordered-set?course=fc1&section=combinatorics-probability-math

Variant: returning index of number instead of a boolean
*/
export const findInOrderedList = (list: number[], target: number): number => {
    // Can't find anything in an empty or undefined list!
    if (!list?.length) {
        return -1;
    }

    // Initially consider the entire list
    let begIdx = 0;
    let endIdx = list.length - 1;

    // Continually divide the range in half based on where we think the target
    // is until we find the target, or the range size reaches zero, in which
    // case we know the target is not present.
    while (begIdx <= endIdx) {
        // Find an index and the item roughly in the middle of the current range
        const len = endIdx - begIdx;
        const halfLen = Math.floor(len / 2);
        const midIdx = halfLen + begIdx;

        // Grab the start, middle, and end items
        const [beg, mid, end] = [begIdx, midIdx, endIdx].map((i) => list[i]);

        // Items are not in an order the algorithm depends on. Throw an error
        if (!(beg <= mid && mid <= end)) {
            throw new Error('List is not in order!');
        }

        // Target found in the middle! Return the middle index
        if (target === mid) {
            return midIdx;
        }

        // Target is out of range. Return "not found" index
        if (!(beg <= target && target <= end)) {
            return -1;
        }

        // Target is in the left half. Set the end index of the next range just
        // before the middle index.
        if (target < mid) {
            endIdx = midIdx - 1;
        }

        // Target is in the right half. Set the beginning index of the next
        // range just after the middle index.
        if (mid < target) {
            begIdx = midIdx + 1;
        }
    }
};
