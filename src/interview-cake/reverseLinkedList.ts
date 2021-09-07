/*
Hooray! It's opposite day. Linked lists go the opposite way today.

Write a function for reversing a linked list. Do it in place.

Your function will have one input: the head of the list.

Your function should return the new head of the list.

https://www.interviewcake.com/question/javascript/reverse-linked-list?course=fc1&section=linked-lists

Notes:

    Two items:

    - null -> 1 -> 2 -> null
    - null <- 1    2 -> null
    - null <- 1 <- 2    null

    Three items:

    - null -> 1 -> 2 -> 3 -> null (start)
    - null <- 1    2 -> 3 -> null
    - null <- 1 <- 2    3 -> null
    - null <- 1 <- 2 <- 3    null (done)
*/
import LinkedListNode from './lib/LinkedListNode';

export const reverseLinkedList = (
    head: LinkedListNode<unknown>,
): LinkedListNode<typeof head.value> => {
    // A list of 0 or 1 items is already reversed, so there's nothing to do
    if (!head?.next) {
        return head;
    }

    // Maintain a 3-item window of the current, previous, and next nodes. Move
    // the window forward by 1 item at a time, each time pointing the current
    // node to the previous node, until the current item runs off the end of the
    // list, at which point we can return the previous node as the new head.
    let prevNode = null;
    let curNode = head;
    let nextNode = head.next;

    while (curNode) {
        nextNode = curNode.next;
        curNode.next = prevNode;
        prevNode = curNode;
        curNode = nextNode;
    }

    return prevNode;
};
