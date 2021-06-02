import { deleteNode, LinkedListNode } from '../deleteNode';

describe('deleteNode', () => {
    it('deletes a node from a singly linked list given only a reference to the node', () => {
        const a = new LinkedListNode('A');
        const b = new LinkedListNode('B');
        const c = new LinkedListNode('C');

        a.next = b;
        b.next = c;

        deleteNode(b);

        expect(a.next).toStrictEqual(c);
    });

    it('Throws if the requested node is the last node', () => {
        const a = new LinkedListNode('A');
        const b = new LinkedListNode('B');
        const c = new LinkedListNode('C');

        a.next = b;
        b.next = c;

        expect(() => {
            deleteNode(c);
        }).toThrowErrorMatchingInlineSnapshot(
            `"Cannot delete last node in a linked list"`,
        );
    });
});
