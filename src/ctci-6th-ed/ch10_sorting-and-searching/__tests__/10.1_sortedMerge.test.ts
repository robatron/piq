import { mergeSorted, mergeSortedInPlace } from '../10.1_sortedMerge';
import { SortDirection } from '../sortUtils';

// Concatenate then sort two lists
const concatSort = (listA, listB, sortDir) =>
    listA.concat(listB).sort((a, b) => {
        const chooseItemAFirst =
            sortDir === SortDirection.ascending ? a < b : a > b;

        if (chooseItemAFirst) {
            return -1;
        }

        if (!chooseItemAFirst) {
            return 1;
        }

        return 0;
    });

describe('mergeSorted', () => {
    describe('base cases', () => {
        it('returns the original list B if list A is empty', () => {
            const testList = [1, 2, 3];
            expect(mergeSorted(undefined, testList)).toStrictEqual(testList);
            expect(mergeSorted([], testList)).toStrictEqual(testList);
        });

        it('returns the original list A if list B is empty', () => {
            const testList = [1, 2, 3];
            expect(mergeSorted(testList)).toStrictEqual(testList);
            expect(mergeSorted(testList, [])).toStrictEqual(testList);
        });
    });

    ['ascending', 'descending'].forEach((sortDirName) => {
        const sortDir = SortDirection[sortDirName];

        describe('typical cases', () => {
            it(`merges two sorted lists of equal size in ${sortDirName} order`, () => {
                const testListA = [1, 3, 5, 7, 9];
                const testListB = [0, 2, 4, 6, 8];

                if (sortDir !== SortDirection.ascending) {
                    testListA.reverse();
                    testListB.reverse();
                }

                const actual = mergeSorted(testListA, testListB, sortDir);
                const actualInputListSwap = mergeSorted(
                    testListB,
                    testListA,
                    sortDir,
                );
                const expected = concatSort(testListA, testListB, sortDir);

                expect(actual).toStrictEqual(expected);
                expect(actualInputListSwap).toStrictEqual(expected);
            });

            it(`merges two sorted lists of unequal size in ${sortDirName} order`, () => {
                const testListA = [6, 8, 42, 64, 667, 950, 3518, 4708, 28054];
                const testListB = [700, 4000, 30000];

                if (sortDir !== SortDirection.ascending) {
                    testListA.reverse();
                    testListB.reverse();
                }

                const actual = mergeSorted(testListA, testListB, sortDir);
                const actualInputListSwap = mergeSorted(
                    testListB,
                    testListA,
                    sortDir,
                );
                const expected = concatSort(testListA, testListB, sortDir);

                expect(actual).toStrictEqual(expected);
                expect(actualInputListSwap).toStrictEqual(expected);
            });

            it(`merges two sorted lists with equal values in ${sortDirName} order`, () => {
                const testListA = [1, 2, 3, 4, 5];
                const testListB = [1, 2, 3, 4, 5];

                if (sortDir !== SortDirection.ascending) {
                    testListA.reverse();
                    testListB.reverse();
                }

                expect(
                    mergeSorted(testListA, testListB, sortDir),
                ).toStrictEqual(concatSort(testListA, testListB, sortDir));
            });
        });

        describe('error cases', () => {
            it(`throws if listA is out of expected ${sortDirName} order`, () => {
                const testListA = [1, 3, 5, 7, 9];
                const testListB = [0, 2, 4, 6, 8];

                if (sortDir === SortDirection.ascending) {
                    testListA.reverse();
                } else {
                    testListB.reverse();
                }

                expect(() => {
                    mergeSorted(testListA, testListB, sortDir);
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Input list 'listA' is not in ${sortDirName} order as expected"`,
                );
            });

            it(`throws if listB is out of expected ${sortDirName} order`, () => {
                const testListA = [1, 3, 5, 7, 9];
                const testListB = [0, 2, 4, 6, 8];

                if (sortDir === SortDirection.ascending) {
                    testListB.reverse();
                } else {
                    testListA.reverse();
                }

                expect(() => {
                    mergeSorted(testListA, testListB, sortDir);
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Input list 'listB' is not in ${sortDirName} order as expected"`,
                );
            });
        });
    });
});

describe('mergeSortedInPlace', () => {
    describe('error cases', () => {
        [undefined, null].forEach((nullableA) => {
            [undefined, null].forEach((nullableB) => {
                it(`throws an error if listA is ${nullableA} and listB is ${nullableB}`, () => {
                    expect(() => {
                        mergeSortedInPlace(nullableA, nullableB);
                    }).toThrowErrorMatchingInlineSnapshot(
                        `"Neither listA nor listB may \`undefined\` nor \`null\`"`,
                    );
                });
            });
        });
    });

    describe('empty lists', () => {
        it('leaves listA untouched if listB is empty', () => {
            const testListA = [1, 2, 3];
            const testListB = [];

            mergeSortedInPlace(testListA, testListB);

            expect(testListA).toStrictEqual([1, 2, 3]);
        });

        it('copies all listB into listA if listA is empty', () => {
            const testListA = [];
            const testListB = [1, 2, 3];

            mergeSortedInPlace(testListA, testListB);

            expect(testListA).toStrictEqual(testListB);
        });
    });

    ['ascending', 'descending'].forEach((sortDirName) => {
        const sortDir = SortDirection[sortDirName];

        describe(`typical cases (${sortDirName})`, () => {
            const testTypicalCase = (
                caseDescription: string,
                testListA: Array<number>,
                testListB: Array<number>,
                expected: Array<number>,
            ): void => {
                it(caseDescription, () => {
                    if (sortDir === SortDirection.descending) {
                        testListA.reverse();
                        testListB.reverse();
                        expected.reverse();
                    }
                    mergeSortedInPlace(testListA, testListB, sortDir);
                    expect(testListA).toStrictEqual(expected);
                });
            };

            testTypicalCase(
                `merges listB into listA in ${sortDirName} order when both lists are equal size`,
                [1, 3, 5, 7, 9],
                [0, 2, 4, 6, 8],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            );

            testTypicalCase(
                `merges listB into listA in ${sortDirName} order when listA is larger`,
                [1, 3, 5, 7, 9],
                [0, 2, 4],
                [0, 1, 2, 3, 4, 5, 7, 9],
            );

            testTypicalCase(
                `merges listB into listA in ${sortDirName} order when listB is larger`,
                [1, 3, 5],
                [0, 2, 4, 6, 8],
                [0, 1, 2, 3, 4, 5, 6, 8],
            );
        });
    });
});
