export enum SortDirection {
    ascending,
    descending,
}

/**
 * Sort list w/ bubble sort
 */
export const bubbleSort = (
    list: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
): void => {
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
};
