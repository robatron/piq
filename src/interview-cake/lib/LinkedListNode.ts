// Convert a list of values to a linked list
export const arrayToLinkedList = (arr: unknown[]): typeof nodes => {
    const nodes: LinkedListNode<typeof arr[0]>[] = [];

    for (let i = 0; i < arr.length; i++) {
        const curVal = arr[i];
        const node = new LinkedListNode<typeof curVal>(curVal);

        if (i > 0) {
            nodes[i - 1].next = node;
        }

        nodes.push(node);
    }

    return nodes;
};

// Convert a linked list to an array of values
export const linkedListToArray = (
    head: LinkedListNode<unknown>,
): typeof arr => {
    const arr: typeof head.value[] = [];
    let curNode = head;

    while (curNode) {
        arr.push(curNode.value);
        curNode = curNode.next;
    }

    return arr;
};

// Determine if a linked list is reversed
export const isLinkedListReversed = (
    head: LinkedListNode<unknown>,
    originalNodes: LinkedListNode<unknown>[],
): boolean => {
    let curNode = head;
    for (let i = originalNodes.length - 1; i >= 0; i--) {
        if (originalNodes[i] !== curNode) {
            return false;
        }
        curNode = curNode.next;
    }
    return curNode === null;
};

// Simple linked-list node class
export default class LinkedListNode<T> {
    value: T = null;
    next: LinkedListNode<T> = null;

    constructor(v?: T, n?: LinkedListNode<T>) {
        this.value = v;
        this.next = n;
        return this;
    }
}
