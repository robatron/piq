/**
 * 2.2 - Return Kth to Last
 *
 * Implement an algorithm to find the kth to last element of a singly linked
 * list.
 */

import SinglyLinkedList, { SinglyLinkedListNode } from './SinglyLinkedList';

export const getKthToLast = (
    list: SinglyLinkedList,
    k: number,
): SinglyLinkedListNode => {
    // If the list is empty, there's no kth-to-last node, so return null
    if (!list.head) {
        return null;
    }

    // If k is negative, it's always beyond the end of the list, so return null
    if (k <= 0) {
        return null;
    }

    // Holds the kth to last node, or a temporary node while finding it. Start
    // with the head, which is the 0th-to-last node
    let kthToLastNode: SinglyLinkedListNode = list.head;
    let kthToLastIndex = 0;

    // Length of the list so far
    let listLength = 1;

    // Traverse the linked list
    let curNode = list.head;
    while (curNode.next) {
        // If the distance between the current node and the requested
        // kth-to-last node is correct, drag along the kthToLastNode. E.g., if
        // the 2nd-to-last node was requested, the curNode and the kth- to-last
        // node should be exactly one node apart
        if (listLength - kthToLastIndex === k) {
            kthToLastNode = kthToLastNode.next;
            kthToLastIndex++;
        }

        curNode = curNode.next;
        listLength++;
    }

    // If the list is smaller than the requested kth-to-last node, e.g., the
    // list is length 1, but the 2nd-to-last node was requested, there isn't a
    // kth-to-last node, so return null
    if (listLength < k) {
        return null;
    }

    return kthToLastNode;
};
