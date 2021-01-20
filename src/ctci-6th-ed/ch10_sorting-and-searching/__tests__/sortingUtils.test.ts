import { bubbleSort } from '../sortingUtils';

describe('bubbleSort', () => {
    it('sorts an array of numbers in ascending order', () => {
        const testArray = [60, 41, 21, 96, 86];
        bubbleSort(testArray);
        expect(testArray).toStrictEqual([21, 41, 60, 86, 96]);
    });
});
