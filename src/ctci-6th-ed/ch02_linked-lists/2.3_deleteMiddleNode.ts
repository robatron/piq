/**
 * 2.3 - Delete Middle Node
 *
 * Implement an algorithm to delete a node in the middle (i.e., any node but
 * the first and last node, not necessarily the exact middle) of a
 * singly-linked list, given only access to that node.
 *
 * Example:
 *
 *  Input:  The node c from the linked list a->b->c->d->e->f
 *  Output: Nothing is returned, but the new linked list looks like a->b->d->e->f
 */
import { SinglyLinkedListNode } from './SinglyLinkedList';

export const deleteMiddleNode = (n: SinglyLinkedListNode): void => {
    // If n is the end node, don't do anything
    if (!n.next) {
        return;
    }

    // Copy the next node contents
    const nextVal = n.next.value;
    const nextNext = n.next.next;

    // Delete the next node
    delete n.next;

    // Copy the next node contents into n, assuming its identity
    n.value = nextVal;
    n.next = nextNext;
};
