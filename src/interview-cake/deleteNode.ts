/*
Delete a node from a singly-linked list, given only a variable pointing to that
node.

The input could, for example, be the variable b below:

    class LinkedListNode {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    const a = new LinkedListNode('A');
    const b = new LinkedListNode('B');
    const c = new LinkedListNode('C');

    a.next = b;
    b.next = c;

    deleteNode(b);

https://www.interviewcake.com/question/javascript/delete-node
*/

import LinkedListNode from './lib/LinkedListNode';

// To "delete" this node, we just need to copy the `value` and `next` ref from
// the next node and delete it. (We don't actually have to delete it; It will be
// automatically garbage collected.)
export const deleteNode = <T>(node: LinkedListNode<T>): void => {
    const next = node.next;

    if (next) {
        delete node.next;

        node.value = next.value;
        node.next = next.next;
    } else {
        throw new Error('Cannot delete last node in a linked list');
    }
};
