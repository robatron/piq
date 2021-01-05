import {
    arrayToSinglyLinkedListNode,
    singlyLinkedListNodeToArray,
} from './singlyLinkedListUtils';

export class SinglyLinkedListNode {
    next: SinglyLinkedListNode;
    value: number;

    constructor(val: number = null, next: SinglyLinkedListNode = null) {
        this.value = val;
        this.next = next;
    }
}

export default class SinglyLinkedList {
    head: SinglyLinkedListNode;

    constructor();
    constructor(head: SinglyLinkedListNode);
    constructor(head: Array<SinglyLinkedListNode['value']>);
    constructor(
        head?: Array<SinglyLinkedListNode['value']> | SinglyLinkedListNode,
    ) {
        if (!head) {
            this.head = null;
        } else if (head instanceof SinglyLinkedListNode) {
            this.head = head;
        } else if (Array.isArray(head)) {
            this.head = arrayToSinglyLinkedListNode(head);
        }
    }

    /** Return the linked list as an array */
    toArray(): Array<SinglyLinkedListNode['value']> {
        return singlyLinkedListNodeToArray(this.head);
    }

    /** Return the node at a position */
    getNodeAtIndex(idx: number): SinglyLinkedListNode {
        if (idx < 0) {
            return null;
        }

        let curNode = this.head;

        for (let i = 0; i < idx; ++i) {
            if (!curNode?.next) {
                return null;
            }
            curNode = curNode.next;
        }

        return curNode;
    }
}
