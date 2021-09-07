import LinkedListNode, { arrayToLinkedList } from '../lib/LinkedListNode';
import { containsCycle } from '../linkedListCycle';

describe('containsCycle', () => {
    /*
    let desc = 'linked list with no cycle';
    let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
    assertEquals(containsCycle(nodes[0]), false, desc);
    */
    it('returns false for linked lists w/o cycles', () => {
        const nodes = arrayToLinkedList([1, 2, 3, 4]);
        expect(containsCycle(nodes[0])).toBe(false);
    });

    /*
    desc = 'cycle loops to beginning';
    nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
    nodes[3].next = nodes[0];
    assertEquals(containsCycle(nodes[0]), true, desc);
    */
    it('returns true if linked list loops back to beginning', () => {
        const nodes = arrayToLinkedList([1, 2, 3, 4]);
        nodes[3].next = nodes[0];
        expect(containsCycle(nodes[0])).toBe(true);
    });

    /*
    desc = 'cycle loops to middle';
    nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
    nodes[4].next = nodes[2];
    assertEquals(containsCycle(nodes[0]), true, desc);
    */
    it('returns true if linked list loops to middle', () => {
        const nodes = arrayToLinkedList([1, 2, 3, 4, 5]);
        nodes[4].next = nodes[2];
        expect(containsCycle(nodes[0])).toBe(true);
    });

    /*
    desc = 'two node cycle at end';
    nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
    nodes[4].next = nodes[3];
    assertEquals(containsCycle(nodes[0]), true, desc);
    */
    it('returns true if linked list has double link at end', () => {
        const nodes = arrayToLinkedList([1, 2, 3, 4, 5]);
        nodes[4].next = nodes[3];
        expect(containsCycle(nodes[0])).toBe(true);
    });

    /*
    desc = 'empty list';
    assertEquals(containsCycle(null), false, desc);
    */
    it('returns false for an empty list', () => {
        expect(containsCycle(null)).toBe(false);
    });

    /*
    desc = 'one element linked list no cycle';
    let firstNode = new LinkedListNode(1);
    assertEquals(containsCycle(firstNode), false, desc);
    */
    it('returns false for single-item list w/o cycle', () => {
        const node = new LinkedListNode<number>(1);
        expect(containsCycle(node)).toBe(false);
    });

    /*
    desc = 'one element linked list cycle';
    firstNode = new LinkedListNode(1);
    firstNode.next = firstNode;
    assertEquals(containsCycle(firstNode), true, desc);
    */
    it('returns true for single-item list with cycle', () => {
        const node = new LinkedListNode<number>(1);
        node.next = node;
        expect(containsCycle(node)).toBe(true);
    });
});
