import { removeDupes, removeDupesNoBuff } from '../2.1_removeDupes';
import SinglyLinkedList from '../SinglyLinkedList';

// Functions should behave identically, so make a test suite for each
[removeDupes, removeDupesNoBuff].forEach((fn) => {
    describe(fn.name, () => {
        it(`removes duplicates from a linked list`, () => {
            const testList = new SinglyLinkedList([1, 2, 2, 3]);
            expect(fn(testList).toArray()).toStrictEqual([1, 2, 3]);
        });

        it('removes multiple duplicates from a linked list', () => {
            const testList = new SinglyLinkedList([1, 2, 2, 3, 4, 2, 5, 6, 3]);
            expect(fn(testList).toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
        });

        it('returns an empty list for an empty list', () => {
            const testList = new SinglyLinkedList();
            expect(fn(testList).toArray()).toStrictEqual([]);
        });
    });
});
