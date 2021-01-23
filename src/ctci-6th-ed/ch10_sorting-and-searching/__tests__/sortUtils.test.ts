import {
    bubbleSort,
    merge,
    mergeSort,
    radixSort,
    selectionSort,
    SortDirection,
} from '../sortUtils';

[bubbleSort, mergeSort, selectionSort, radixSort].forEach((sortFn) => {
    describe('Common sort behavior of ' + sortFn.name, () => {
        it('does nothing if the list is null', () => {
            expect(sortFn(null)).toBeUndefined();
        });

        it('does nothing if the list is empty', () => {
            const testArray = [];
            sortFn(testArray);
            expect(testArray).toStrictEqual([]);
        });

        ['ascending', 'descending'].forEach((sortDir) => {
            it(`sorts an array of numbers in ${sortDir} order`, () => {
                const testArray = [
                    42,
                    4708,
                    950,
                    54218,
                    28054,
                    667,
                    6,
                    8,
                    64,
                    3518,
                ];
                sortFn(testArray, SortDirection[sortDir]);
                expect(testArray).toStrictEqual(
                    sortDir === 'ascending'
                        ? [6, 8, 42, 64, 667, 950, 3518, 4708, 28054, 54218]
                        : [54218, 28054, 4708, 3518, 950, 667, 64, 42, 8, 6],
                );
            });
        });
    });
});

describe('merge sort', () => {
    describe('edge cases', () => {
        it('does nothing if the sublist indexes are invalid', () => {
            const testList = [38, 27, 43, 3, 9, 82, 10];
            const expected = [38, 27, 43, 3, 9, 82, 10];

            // Invalid: Start index larger than end
            mergeSort(testList, SortDirection.ascending, 1, 0);
            expect(testList).toStrictEqual(expected);

            // Invalid: Start and end index are the same
            mergeSort(testList, SortDirection.ascending, 1, 1);
            expect(testList).toStrictEqual(expected);
        });

        it('does nothing if the sublist is a single element', () => {
            const testList = [38, 27, 43, 3, 9, 82, 10];
            const expected = [38, 27, 43, 3, 9, 82, 10];

            mergeSort(testList, SortDirection.ascending, 0, 1);
            expect(testList).toStrictEqual(expected);
        });

        it(`sorts an array of numbers in ascending order`, () => {
            const testArray = [38, 27, 43, 3, 9, 82, 10];
            mergeSort(testArray);
            expect(testArray).toStrictEqual([3, 9, 10, 27, 38, 43, 82]);
        });
    });

    ['ascending', 'decending'].forEach((sortDir) => {
        describe(`merge (${sortDir})`, () => {
            it(`merges a left sublist and an empty right sublist`, () => {
                const testList = [38, 42, 47];
                merge(testList, SortDirection[sortDir], 0, 3, 3);
                expect(testList).toStrictEqual([38, 42, 47]);
            });

            it(`merges a right sublist and an empty left sublist`, () => {
                const testList = [38, 42, 47];
                merge(testList, SortDirection[sortDir], 0, 0, 3);
                expect(testList).toStrictEqual([38, 42, 47]);
            });

            it(`merges two single-element sublists`, () => {
                const testList = sortDir === 'ascending' ? [38, 27] : [27, 38];
                merge(testList, SortDirection[sortDir], 0, 1, 2);
                expect(testList).toStrictEqual(
                    sortDir === 'ascending' ? [27, 38] : [38, 27],
                );
            });

            it(`merges two multi-element sublists in ${sortDir} order`, () => {
                const testList =
                    sortDir === 'ascending'
                        ? [27, 38, 43, 9, 10, 82]
                        : [27, 10, 9, 82, 43, 38];
                merge(testList, SortDirection[sortDir], 0, 3, 6);
                expect(testList).toStrictEqual(
                    sortDir === 'ascending'
                        ? [9, 10, 27, 38, 43, 82]
                        : [82, 43, 38, 27, 10, 9],
                );
            });
        });
    });
});
