/**
 * Search for a value in a sorted list using a binary search algorithm
 */
export function binarySearch(
    sortedList: Array<number>,
    target: number,
    idxStart = 0,
    idxEnd = sortedList?.length,
): number {
    // Length of the sublist as defined by the start / end indexes
    const sublistLen = idxEnd - idxStart;

    // Nothing to do if there's nothing to search for / search through
    if (!sublistLen || typeof target !== 'number') {
        return;
    }

    // If we have a single element, compare it to the target immediately
    if (sublistLen === 1) {
        if (sortedList[0] === target) {
            return idxStart;
        }
        return;
    }

    // Partition the sorted list in two roughly equal halves
    const idxMid = Math.round(sublistLen / 2) + idxStart;
    const midpointValue = sortedList[idxMid];

    // Search for the target if it's in the left or right half, or
    // return the midpoint immediately if it matches the target
    if (target > midpointValue) {
        return binarySearch(sortedList, target, idxMid, idxEnd);
    } else if (target < midpointValue) {
        return binarySearch(sortedList, target, idxStart, idxMid);
    } else {
        return idxMid;
    }
}
