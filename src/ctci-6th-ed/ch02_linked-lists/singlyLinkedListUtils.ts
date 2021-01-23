import { SinglyLinkedListNode } from './SinglyLinkedList';

/** Convert a singly-linked list to an array */
export const singlyLinkedListNodeToArray = (
    head: SinglyLinkedListNode,
): Array<SinglyLinkedListNode['value']> => {
    if (!head || head.value === null) {
        return [];
    }

    const result: Array<SinglyLinkedListNode['value']> = [head.value];

    while (head.next !== null) {
        result.push(head.next.value);
        head = head.next;
    }

    return result;
};

/** Convert an array to a singly-linked list */
export const arrayToSinglyLinkedListNode = (
    arr: Array<SinglyLinkedListNode['value']> = [],
): SinglyLinkedListNode => {
    if (arr.length === 0) {
        return new SinglyLinkedListNode();
    }

    if (arr.length === 1) {
        return new SinglyLinkedListNode(arr[0]);
    }

    return new SinglyLinkedListNode(
        arr[0],
        arrayToSinglyLinkedListNode(arr.slice(1)),
    );
};
