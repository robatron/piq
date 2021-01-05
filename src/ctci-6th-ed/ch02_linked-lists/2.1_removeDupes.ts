/**
 * 2.1 - Remove Dupes
 *
 * Write code to remove duplicates from an unsorted linked list.
 *
 * Followup: How would you solve this problem if a temporary buffer is not allowed?
 */

import SinglyLinkedList, { SinglyLinkedListNode } from './SinglyLinkedList';

export function removeDupes(list: SinglyLinkedList): SinglyLinkedList {
    // Map to track which values we've already encountered
    const seenValues: Record<SinglyLinkedListNode['value'], boolean> = {};

    // Pointers to previous and current nodes
    let curNode: SinglyLinkedListNode = list.head;
    let prevNode: SinglyLinkedListNode = null;

    while (curNode) {
        const valueAlreadySeen = seenValues[curNode.value] === true;

        // If we've already encountered the value, cut it out of the chain and
        // move on
        if (valueAlreadySeen) {
            prevNode.next = curNode.next;
        } else {
            // Mark this value as "seen"
            seenValues[curNode.value] = true;

            prevNode = curNode;
        }

        // Move onto the next node
        curNode = curNode.next;
    }

    return list;
}

export function removeDupesNoBuff(list: SinglyLinkedList): SinglyLinkedList {
    let curNode: SinglyLinkedListNode = list.head;

    while (curNode) {
        // Compare the current node to each of the following nodes. If any dupes
        // are found, cut them out of the chain
        let lastRunnerNode: SinglyLinkedListNode = curNode;
        let runnerNode: SinglyLinkedListNode = curNode.next;

        while (runnerNode) {
            if (runnerNode.value === curNode.value) {
                lastRunnerNode.next = runnerNode.next;
            } else {
                lastRunnerNode = runnerNode;
            }
            runnerNode = runnerNode.next;
        }

        curNode = curNode.next;
    }

    return list;
}
