export enum SortDirection {
    ascending,
    descending,
}

/** Sort list w/ bubble sort, ascending by default */
export const bubbleSort = (
    list: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
): void => {
    let finished = false;

    while (!finished) {
        // Start each scan with the 'finished' flag set. If a swap is needed
        // during the scan, we know we have to do at least one more scan.
        finished = true;

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
                finished = false;
            }
        });
    }
};
