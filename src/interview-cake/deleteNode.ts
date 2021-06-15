/*
Delete a node from a singly-linked list given only a variable pointing to that node.

The input could, for example, be the variable b below:

    class LinkedListNode(object):

    def __init__(self, value):
        self.value = value
        self.next  = None

    a = LinkedListNode('A')
    b = LinkedListNode('B')
    c = LinkedListNode('C')

    a.next = b
    b.next = c

    delete_node(b)

https://www.interviewcake.com/question/python3/delete-node
*/

export class LinkedListNode<Type> {
    value: Type;
    next: LinkedListNode<Type>;

    constructor(value: Type, next?: LinkedListNode<Type>) {
        this.value = value;
        this.next = next;
    }
}

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
