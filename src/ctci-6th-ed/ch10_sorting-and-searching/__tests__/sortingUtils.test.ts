import { bubbleSort, SortDirection } from '../sortingUtils';

describe('bubbleSort', () => {
    it('sorts an array of numbers in ascending order', () => {
        const testArray = [60, 41, 21, 96, 86, 1];
        bubbleSort(testArray);
        expect(testArray).toStrictEqual([1, 21, 41, 60, 86, 96]);
    });

    it('sorts an array of numbers in descending order', () => {
        const testArray = [60, 41, 21, 96, 86, 1];
        bubbleSort(testArray, SortDirection.descending);
        expect(testArray).toStrictEqual([96, 86, 60, 41, 21, 1]);
    });
});
