/**
 * 10.2 - Search in Rotated Array
 *
 * Given a sorted array of n integers that has been rotated an unknown number
 * of times, write code to find an element in the array. You may assume that
 * the array was originally sorted in increasing (ascending) order.
 *
 * Example:
 *  - Input: Find '5' in [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14]
 *  - Output: 8 (the index of '5' in the input list)
 */

// Find the starting index of a rotated list in ascending order using a
// binary search-style algorithm
export const findStartOfRotArray = (
    list: Array<number>,
    sublistStart = 0,
    sublistLen = list.length,
): number => {
    // Verify the sublist start index is within range
    if (sublistStart < 0 || sublistStart > list.length - 1) {
        throw new Error('Sublist start index is out of range');
    }

    // Can't find the start of an empty list
    if (sublistLen < 1) {
        return -1;
    }

    // If sublist has one item, it's the only possible start index
    if (sublistLen === 1) {
        return sublistStart;
    }

    // Index of the last item, wrapping around to the beginning if necessary
    const sublistEnd = (sublistLen - 1 + sublistStart) % list.length;

    const startItem = list[sublistStart];
    const endItem = list[sublistEnd];

    // If the sublist has two items, just return the index of the smaller one.
    // If the items are out of order, it means the start index is `last` (or
    // the beginning of the right half of the list). Otherwise, the items are
    // in order, so the start index is `first` (or the beginning of the left
    // half of the list).
    if (sublistLen === 2) {
        return startItem > endItem ? sublistEnd : sublistStart;
    }

    // If the list is not in order, or if the start and end items are equal,
    // the start index is somewhere in the middle
    if (startItem >= endItem) {
        // Find the approximate middle index, wrapping to the beginning if necessary
        const leftHalfLen = Math.round(sublistLen / 2);
        const rightHalfLen = sublistLen - leftHalfLen;
        const leftHalfEnd = (leftHalfLen - 1 + sublistStart) % list.length;
        const leftHalfEndItem = list[leftHalfEnd];
        const rightHalfStart = (leftHalfEnd + 1) % list.length;
        const rightHalfStartItem = list[rightHalfStart];

        // If the start item is equal to the end item, as well as the left half
        // end and right half start items, we have the special case where all
        // items in the list are equal, so just return the sublist start.
        if (
            [leftHalfEndItem, rightHalfStartItem, endItem].every(
                (item) => startItem === item,
            )
        ) {
            return sublistStart;
        }

        // If the left half is NOT in order, the starting index is inside.
        // Search the left half, and if we find a non-first value, we know
        // we've found the start index, so return it
        if (startItem > leftHalfEndItem) {
            const startIdx = findStartOfRotArray(
                list,
                sublistStart,
                leftHalfLen,
            );

            if (startIdx !== sublistStart) {
                return startIdx;
            }
        }

        // Otherwise, we know the right half is not in order, and the starting
        // index is inside. search the right half, and if we find a non-first
        // value, we've found the start index, so return it
        const startIdx = findStartOfRotArray(
            list,
            rightHalfStart,
            rightHalfLen,
        );

        if (startIdx !== leftHalfEnd) {
            return startIdx;
        }

        // If we don't find a non-first value in either half, that means our
        // midpoint is exactly between the largest and smallest value in the
        // list, so the start index is the beginning of the right half
        return leftHalfEnd;
    }

    // Otherwise the list is in order with no rotation, and sublistStart is the
    // true starting index
    return sublistStart;
};

// Find the starting index of a rotated list in ascending order using a
// brute-force algorithm
export const findStartOfRotArrayBrute = (
    list: Array<number>,
    sublistStart = 0,
    sublistLen = list.length,
): number => {
    let lastVal = list[sublistStart];
    let seqStart = sublistStart;

    for (let i = sublistStart; i < sublistStart + sublistLen; i++) {
        const curIdx = i % list.length;
        const curVal = list[curIdx];

        if (curVal < lastVal) {
            seqStart = curIdx;
            break;
        }

        lastVal = curVal;
    }

    return seqStart;
};

// Find a target in a ascending-order list that's been rotated an unknown
// number of times
export const searchInRotArray = (
    target: number,
    list: Array<number> = [],
    sublistStart = 0,
    sublistLen = list.length,
    useBruteSeqStartAlgorithm = false,
): number => {
    // We won't find a non-number target in any list, and can't find any target
    // in empty lists, so return -1 for either case
    if (typeof target !== 'number' || !list.length || sublistLen < 1) {
        return -1;
    }

    // Verify the sublist start index is within range
    if (sublistStart < 0 || sublistStart > list.length - 1) {
        throw new Error('Sublist start index is out of range');
    }

    // If the sublist has only one item, just compare and return
    if (sublistLen === 1) {
        return list[sublistStart] === target ? sublistStart : -1;
    }

    // Determine the start index of the ordered sequence of the sublist
    const seqStart = (useBruteSeqStartAlgorithm
        ? findStartOfRotArrayBrute
        : findStartOfRotArray)(list, sublistStart, sublistLen);

    // Determine the end index of the ordered sequence of the sublist
    const seqEnd = (seqStart + sublistLen - 1) % list.length;

    // If the target is out of range of the smallest and largest values in the
    // sublist (the first and last items in the ordered sequence) the target
    // is not in the sublist
    if (target < list[seqStart] || target > list[seqEnd]) {
        return -1;
    }

    // Otherwise, the target might still be in the sublist, so we can perform a
    // binary search.

    // Determine the approximate middle of the sorted sequence in the sublist,
    // wrapping to the beginning if mid is past the end of the list
    const leftHalfLen = Math.round(sublistLen / 2);
    const seqMid = (leftHalfLen - 1 + seqStart) % list.length;

    // If target is in the left half
    if (target < list[seqMid]) {
        return searchInRotArray(target, list, seqStart, leftHalfLen);
    }

    // If the target is in the right half
    else if (target > list[seqMid]) {
        const rightHalfLen = sublistLen - leftHalfLen;
        const seqMidNext = (seqMid + 1) % list.length;
        return searchInRotArray(target, list, seqMidNext, rightHalfLen);
    }

    // If the target is the middle item, we've found it! However, we should
    // return the first occurrence of the target in the sequence, so also see if
    // there are any duplicates of the target before this item, and return the
    // first occurrence in the run.
    else {
        const getPrevIdx = (i: number) => (i - 1 < 0 ? list.length - 1 : i - 1);

        let curIdx = seqMid;
        let prevIdx = getPrevIdx(curIdx);
        let prevItem = list[prevIdx];

        while (prevItem === target) {
            curIdx = prevIdx;
            prevIdx = getPrevIdx(curIdx);
            prevItem = list[prevIdx];

            // If we've traversed the entire list, it means the entire sublist
            // is the target number, so just return the first item
            if (curIdx === seqMid) {
                return sublistStart;
            }
        }

        return curIdx;
    }
};
