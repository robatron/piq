import { binarySearch } from '../searchUtils';

describe('binarySearch', () => {
    describe('base cases', () => {
        it('returns undefined if the list is undefined', () => {
            expect(binarySearch(undefined, undefined)).toBeUndefined();
        });

        it('returns undefined if the target is undefined', () => {
            expect(binarySearch([0], undefined)).toBeUndefined();
        });

        it('returns undefined if the list is empty', () => {
            expect(binarySearch([], 0)).toBeUndefined();
        });
    });

    describe('basic behavior', () => {
        const testList = [6, 8, 42, 64, 667, 950, 3518, 4708, 28054, 54218];

        it('finds every value in a sorted list', () => {
            for (let i = 0; i < testList.length; i++) {
                expect(binarySearch(testList, testList[i])).toBe(i);
            }
        });
    });
});
