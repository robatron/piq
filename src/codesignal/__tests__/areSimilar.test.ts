import { areSimilar } from '../areSimilar';

describe('examples', () => {
    test('equal lists (no swaps needed)', () => {
        const list1 = [1, 2, 3];
        const list2 = [1, 2, 3];
        expect(areSimilar(list1, list2)).toBe(true);
    });

    test('only one swap needed', () => {
        const list1 = [1, 2, 3];
        const list2 = [2, 1, 3];
        expect(areSimilar(list1, list2)).toBe(true);
    });

    test('more than one swap needed', () => {
        const list1 = [1, 2, 2];
        const list2 = [2, 1, 1];
        expect(areSimilar(list1, list2)).toBe(false);
    });
});
