/*
You have a linked list and want to find the kth to last node.

Write a function kthToLastNode() that takes an integer k and the headNode of a
singly-linked list, and returns the kth to last node in the list.

For example:

    class LinkedListNode {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    const a = new LinkedListNode('Angel Food');
    const b = new LinkedListNode('Bundt');
    const c = new LinkedListNode('Cheese');
    const d = new LinkedListNode("Devil's Food");
    const e = new LinkedListNode('Eccles');

    a.next = b;
    b.next = c;
    c.next = d;
    d.next = e;

    kthToLastNode(2, a);

Returns the node with value "Devil's Food" (the 2nd to last node)

https://www.interviewcake.com/question/javascript/kth-to-last-node-in-singly-linked-list
*/

export class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T>;

    constructor(v: T, n?: LinkedListNode<T>) {
        this.value = v;
        this.next = n;
    }
}

export default <T>(k: number, head: LinkedListNode<T>): LinkedListNode<T> => {
    let kthToLastNode: LinkedListNode<T>;
    let curNode = head;
    let curNodeLength = 0;

    while (curNode) {
        curNodeLength++;
        curNode = curNode.next;

        if (curNodeLength === k) {
            kthToLastNode = head;
        } else if (curNodeLength > k) {
            kthToLastNode = kthToLastNode.next;
        }
    }

    return kthToLastNode;
};
