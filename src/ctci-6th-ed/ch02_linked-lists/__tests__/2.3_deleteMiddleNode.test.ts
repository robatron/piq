import { deleteMiddleNode } from '../2.3_deleteMiddleNode';
import SinglyLinkedList from '../SinglyLinkedList';

describe('deleteMiddleNode', () => {
    it('does nothing if the node is the end node', () => {
        const testListArray = [0, 1, 2, 3, 4];
        const testList = new SinglyLinkedList(testListArray);
        const testNode = testList.getNodeAtIndex(4);

        deleteMiddleNode(testNode);

        expect(testList.toArray()).toStrictEqual(testListArray);
    });

    it('deletes the specified "middle" node', () => {
        const testList = new SinglyLinkedList([0, 1, 2, 3, 4]);
        const testNode = testList.getNodeAtIndex(2);

        deleteMiddleNode(testNode);

        expect(testList.toArray()).toStrictEqual([0, 1, 3, 4]);
    });

    it('deletes the head node (enhancement)', () => {
        const testList = new SinglyLinkedList([0, 1, 2, 3, 4]);
        const testNode = testList.getNodeAtIndex(0);

        deleteMiddleNode(testNode);

        expect(testList.toArray()).toStrictEqual([1, 2, 3, 4]);
    });
});
