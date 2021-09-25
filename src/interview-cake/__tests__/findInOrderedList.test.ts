import { findInOrderedList } from '../findInOrderedList';

test('list out-of-order', () => {
    const list = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const target = 8;
    expect(() => {
        findInOrderedList(list, target);
    }).toThrowErrorMatchingInlineSnapshot(`"List is not in order!"`);
});

describe('sample tests', () => {
    test('empty array', () => {
        const list = [];
        const target = 1;
        const expctd = -1;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('one item, target present', () => {
        const list = [1];
        const target = 1;
        const expctd = 0;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('one item, target absent', () => {
        const list = [1];
        const target = 2;
        const expctd = -1;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('small array, number present', () => {
        const list = [2, 4, 6];
        const target = 4;
        const expctd = 1;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('small array, number absent', () => {
        const list = [2, 4, 6];
        const target = 5;
        const expctd = -1;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('large array, number present', () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const target = 8;
        const expctd = 7;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('large array, number absent', () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const target = 0;
        const expctd = -1;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('large array, number first', () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const target = 1;
        const expctd = 0;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });

    test('large array, number last', () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const target = 1;
        const expctd = 0;
        expect(findInOrderedList(list, target)).toBe(expctd);
    });
});
