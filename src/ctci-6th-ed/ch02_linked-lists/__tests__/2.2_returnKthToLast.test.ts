import { getKthToLast } from '../2.2_returnKthToLast';
import SinglyLinkedList from '../SinglyLinkedList';

describe('getKthToLastNode', () => {
    it('returns null if the list is empty', () => {
        expect(getKthToLast(new SinglyLinkedList(), 2)).toBeNull();
    });

    it('returns null if the kth-to-last node is negative', () => {
        const testList = new SinglyLinkedList([1, 2, 3, 4, 5]);
        expect(getKthToLast(testList, -1)).toBeNull();
    });

    it('returns the 2nd-to-last node', () => {
        const testList = new SinglyLinkedList([1, 2, 3, 4, 5]);
        expect(getKthToLast(testList, 2).value).toEqual(4);
    });

    it('returns the kth-to-last node', () => {
        const testList = new SinglyLinkedList([1, 2, 3, 4, 5]);
        expect(getKthToLast(testList, 3).value).toEqual(3);
    });

    it('returns the end node when k is 1', () => {
        const testList = new SinglyLinkedList([1, 2, 3, 4, 5]);
        expect(getKthToLast(testList, 1).value).toEqual(5);
    });

    it('returns null if the list is too small to contain the kth-to-last node', () => {
        const testList = new SinglyLinkedList([1]);
        expect(getKthToLast(testList, 2)).toBeNull();
    });
});
