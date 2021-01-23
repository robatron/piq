export enum SortDirection {
    ascending,
    descending,
}

/**
 * Sort list w/ bubble sort
 *
 * Runtime: O(n^2) average and worst case
 * Memory: O(1)
 */
export function bubbleSort(
    list: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
): void {
    if (!list?.length) {
        return;
    }

    let curScanSwapCount;

    do {
        curScanSwapCount = 0;

        list.forEach((val, idx) => {
            const nextIdx = idx + 1;
            const nextVal = list[nextIdx];
            const needSwap =
                sortDir === SortDirection.ascending
                    ? val > nextVal
                    : val < nextVal;

            if (needSwap) {
                list[idx] = nextVal;
                list[nextIdx] = val;
                curScanSwapCount++;
            }
        });
    } while (curScanSwapCount);
}

/**
 *
 * Zipper merge two assumed-sorted sublists together. Modifies original list.
 * Helper function for mergeSort.
 *
 * @param list The full array
 * @param sortDir The sorting direction
 * @param start The starting index of the 1st sublist
 * @param middle The starting index of the 2nd sublist
 * @param end One past the ending index of the 2nd sublist
 */
export function merge(
    list: Array<number>,
    sortDir: SortDirection,
    start: number,
    middle: number,
    end: number,
): void {
    // Don't do anything if the indexes are invalid
    if (start > middle || middle > end || end > list.length) {
        return;
    }

    // Length of sublists
    const leftListLen = middle - start;
    const rightListLen = end - middle;

    // Make temp left sublist
    const leftList = [];
    for (let i = start; i < leftListLen + start; ++i) {
        leftList.push(list[i]);
    }

    // Make temp right sublist
    const rightList = [];
    for (let i = middle; i < rightListLen + middle; ++i) {
        rightList.push(list[i]);
    }

    let listPointer = start;
    let leftPointer = 0;
    let rightPointer = 0;

    // Select and compare elements at the front of each sublist and insert them
    // back into the original list in sorted order
    while (leftPointer < leftListLen && rightPointer < rightListLen) {
        const curLeftEl = leftList[leftPointer];
        const curRightEl = rightList[rightPointer];
        const insertLeftEl =
            sortDir === SortDirection.ascending
                ? curLeftEl < curRightEl
                : curLeftEl > curRightEl;

        if (insertLeftEl) {
            list[listPointer] = curLeftEl;
            ++leftPointer;
        } else {
            list[listPointer] = curRightEl;
            ++rightPointer;
        }

        ++listPointer;
    }

    // The sublists might be slightly different sizes, so insert the remaining
    // items into the original list
    while (leftPointer < leftListLen) {
        list[listPointer] = leftList[leftPointer];
        ++leftPointer;
        ++listPointer;
    }

    while (rightPointer < rightListLen) {
        list[listPointer] = rightList[rightPointer];
        ++rightPointer;
        ++listPointer;
    }
}

/**
 * Sort list w/ merge sort
 *
 * Runtime: O(n log (n)) average and worst case
 * Memory: O(n)
 *
 * @param list The list to sort
 * @param sortDir The sorting direction (ascending, descending)
 * @param start Sort list starting at this index
 * @param end Sort list up to (but not including) this index
 */
export function mergeSort(
    list: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
    start = 0,
    end = list?.length,
): void {
    if (!list?.length || end - start <= 1) {
        return;
    }

    // Find the ~ middle
    const middle = Math.floor((start + end) / 2);

    // Sort the left half
    mergeSort(list, sortDir, start, middle);

    // Sort the right half
    mergeSort(list, sortDir, middle, end);

    // Merge the halves together
    merge(list, sortDir, start, middle, end);
}

/**
 * Sort a list w/ radix sort. (A.k.a. bucket sort, digital sort.) Works well
 * for integers. Essentially group numbers by each digit. E.g., group all
 * numbers with 0s in their one's place, then 2s, etc. Then make passes for each
 * place, i.e., 10s place, 100s place, etc.
 *
 * Runtime: O(kn) where k is number of passes (average case)
 */
export function radixSort(
    list: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
): void {
    // Return if the list is empty, or if it has only one element (b/c a list of
    // one is already sorted)
    if (!list?.length || list.length === 1) {
        return;
    }

    // The current digit we're on, starting with the least-significant digit
    let curDigit = 0;

    // Keep track of the largest number of digits as we encounter them
    let maxDigits = 0;

    // Examine each digit of each number, and group them by that digit. Stop
    // when there are no more digits to examine.
    while (curDigit <= maxDigits) {
        const buckets: Array<Array<string>> = [];

        for (let i = 0; i < list.length; ++i) {
            const curItem = String(list[i]);
            const targetBucket =
                Number(curItem[curItem.length - 1 - curDigit]) || 0;

            // Expand the number of max digits as we encounter them
            maxDigits = Math.max(curItem.length, maxDigits);

            // Initialize any new bucket as an empty array
            if (!Array.isArray(buckets[targetBucket])) {
                buckets[targetBucket] = [];
            }

            // Add the current item to the appropriate bucket
            buckets[targetBucket].push(curItem);
        }

        // Clear the list, and fill it from the buckets in order
        list.length = 0;
        for (let i = 0; i < buckets.length; ++i) {
            const curBucket = buckets[i];

            if (Array.isArray(curBucket)) {
                for (let j = 0; j < curBucket.length; ++j) {
                    const curItem = Number(curBucket[j]);
                    list.push(curItem);
                }
            }
        }

        // Move on to the next digit
        ++curDigit;
    }

    // If we need descending order, just reverse the list
    if (sortDir === SortDirection.descending) {
        list.reverse();
    }
}

/**
 * Sort list w/ selection sort
 *
 * Runtime: O(n^2) average and worst case
 * Memory: O(1)
 */
export function selectionSort(
    list: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
): void {
    if (!list?.length) {
        return;
    }

    for (let i = 0; i < list.length; ++i) {
        for (let j = i + 1; j < list.length; ++j) {
            const referenceVal = list[i];
            const comparatorVal = list[j];
            const needsSwap =
                sortDir === SortDirection.ascending
                    ? comparatorVal < referenceVal
                    : comparatorVal > referenceVal;

            if (needsSwap) {
                list[i] = comparatorVal;
                list[j] = referenceVal;
            }
        }
    }
}
