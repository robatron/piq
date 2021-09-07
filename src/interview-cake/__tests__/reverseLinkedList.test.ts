import LinkedListNode, {
    arrayToLinkedList,
    linkedListToArray,
} from '../lib/LinkedListNode';
import { reverseLinkedList } from '../reverseLinkedList';

/*
let desc = 'short linked list';
let nodes = valuesToLinkedListNodes([1, 2]);
let reversedList = reverse(nodes[0]);
assertEquals(isListReversed(reversedList, nodes), true, desc);
*/
test('short linked list', () => {
    const vals = [1, 2];
    const head = arrayToLinkedList(vals)[0];

    const expctd = linkedListToArray(head).reverse();
    const actual = linkedListToArray(reverseLinkedList(head));

    expect(actual).toStrictEqual(expctd);
});

/*
desc = 'long linked list';
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5, 6]);
reversedList = reverse(nodes[0]);
assertEquals(isListReversed(reversedList, nodes), true, desc);
*/
test('long linked list', () => {
    const vals = [1, 2, 3, 4, 5, 6];
    const head = arrayToLinkedList(vals)[0];

    const expctd = linkedListToArray(head).reverse();
    const actual = linkedListToArray(reverseLinkedList(head));

    expect(actual).toStrictEqual(expctd);
});

/*
desc = 'one element linked list';
const node = new LinkedListNode(1);
reversedList = reverse(node);
assertEquals(node.value === reversedList.value && node.next === reversedList.next, true, desc);
*/
test('one element linked list', () => {
    const node = new LinkedListNode(1);
    const actual = reverseLinkedList(node);
    expect(actual).toStrictEqual(node);
});

/*
desc = 'empty linked list';
reversedList = reverse(null);
assertEquals(reversedList, null, desc);
*/
test('empty linked list', () => {
    const actual = reverseLinkedList(null);
    expect(actual).toStrictEqual(null);
});
