import {
    findStartOfRotArray,
    searchInRotArray,
} from '../10.3_searchInRotatedArray';

const testList = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14];

describe('findStartOfRotArray', () => {
    describe('validation', () => {
        it('throws if either index is out of bounds of the list', () => {
            expect(() => {
                findStartOfRotArray(testList, -1);
            }).toThrowErrorMatchingInlineSnapshot(
                `"Sublist start index is out of range"`,
            );

            expect(() => {
                findStartOfRotArray(testList, testList.length);
            }).toThrowErrorMatchingInlineSnapshot(
                `"Sublist start index is out of range"`,
            );
        });
    });

    describe('base cases', () => {
        it('cannot find the beginning of an empty list', () => {
            expect(findStartOfRotArray(testList, 3, 0)).toBe(-1);
        });

        it('returns sublistStart if the sublist has 1 item', () => {
            expect(findStartOfRotArray(testList, 3, 1)).toBe(3);
        });

        it('returns sublistStart if the sublist has 2 items and the items are in order', () => {
            expect(findStartOfRotArray(testList, 3, 2)).toBe(3);
        });

        it('returns sublistEnd if the sublist has 2 items and the items are out of order', () => {
            expect(findStartOfRotArray(testList, 4, 2)).toBe(5);
        });
    });

    describe('sublist start and length do not wrap', () => {
        it('returns the start index if the true start is the first element', () => {
            expect(findStartOfRotArray(testList, 0, 5)).toBe(0);
        });

        it('returns the start index if the true start is in the middle', () => {
            expect(findStartOfRotArray(testList, 0, testList.length)).toBe(5);
        });

        it('returns the end index if the true start is the last element', () => {
            expect(findStartOfRotArray(testList, 0, 6)).toBe(5);
        });

        it('handles lists w/ duplicates that wrap to the beginning', () => {
            const testListWithDupes = [19, 19, 20, 25, 1, 3, 4, 5, 7, 19];
            expect(findStartOfRotArray(testListWithDupes)).toBe(4);
        });

        it('handles lists that are all one number', () => {
            const testListOopsAllThrees = [3, 3, 3, 3, 3];
            expect(findStartOfRotArray(testListOopsAllThrees)).toBe(0);
        });
    });

    describe('sublist length wraps to beginning (but not past the sublist start)', () => {
        it('returns the start index if the true start is the first element', () => {
            expect(findStartOfRotArray(testList, 5, 10)).toBe(5);
        });

        it('returns the start index if the true start is in the middle', () => {
            expect(findStartOfRotArray(testList, 3, 12)).toBe(5);
        });

        it('returns the end index if the true start is the last element', () => {
            expect(findStartOfRotArray(testList, 3, 15)).toBe(5);
        });
    });
});

describe('searchInRotArray', () => {
    describe('base cases', () => {
        it('cannot find a non-number target', () => {
            expect(searchInRotArray(null, testList)).toBe(-1);
        });

        it('cannot find a target in an empty list', () => {
            expect(searchInRotArray(42, [])).toBe(-1);
        });

        it('finds the target in a single-item list', () => {
            expect(searchInRotArray(42, [42], 0, 1)).toBe(0);
        });

        it("doesn't find the target in a single-item list", () => {
            expect(searchInRotArray(42, [0], 0, 1)).toBe(-1);
        });
    });

    describe('typical cases', () => {
        it('finds the target in a list', () => {
            expect(searchInRotArray(19, testList)).toBe(2);
            expect(
                searchInRotArray(19, testList, undefined, undefined, true),
            ).toBe(2);
        });
    });

    describe('edge cases', () => {
        it('handles lists w/ duplicate values', () => {
            const testListWithDupes = [19, 19, 20, 25, 1, 3, 4, 4, 7, 10];
            expect(searchInRotArray(19, testListWithDupes)).toBe(0);
            expect(
                searchInRotArray(
                    19,
                    testListWithDupes,
                    undefined,
                    undefined,
                    true,
                ),
            ).toBe(0);
            expect(searchInRotArray(4, testListWithDupes)).toBe(6);
            expect(
                searchInRotArray(
                    4,
                    testListWithDupes,
                    undefined,
                    undefined,
                    true,
                ),
            ).toBe(6);

            testListWithDupes.forEach((item) => {
                expect(searchInRotArray(item, testListWithDupes)).toBe(
                    testListWithDupes.indexOf(item),
                );
                expect(
                    searchInRotArray(
                        item,
                        testListWithDupes,
                        undefined,
                        undefined,
                        true,
                    ),
                ).toBe(testListWithDupes.indexOf(item));
            });
        });

        it('handles items entirely composed of duplicate values', () => {
            const testListWithDupes = [0, 0, 0, 0, 0];
            expect(searchInRotArray(0, testListWithDupes)).toBe(0);
            expect(
                searchInRotArray(
                    0,
                    testListWithDupes,
                    undefined,
                    undefined,
                    true,
                ),
            ).toBe(0);
        });

        it('handles lists w/ wrapped duplicate values', () => {
            const testListWithDupes = [19, 19, 20, 25, 1, 3, 4, 19, 19, 19];
            expect(searchInRotArray(19, testListWithDupes)).toBe(7);
            expect(
                searchInRotArray(
                    19,
                    testListWithDupes,
                    undefined,
                    undefined,
                    true,
                ),
            ).toBe(7);

            testListWithDupes.forEach((item) => {
                expect(
                    searchInRotArray(
                        item,
                        testListWithDupes.slice(0, 7),
                        undefined,
                        undefined,
                        true,
                    ),
                ).toBe(testListWithDupes.indexOf(item));
            });
        });
    });
});
