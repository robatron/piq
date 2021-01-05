import SinglyLinkedList, { SinglyLinkedListNode } from '../SinglyLinkedList';

describe('SinglyLinkedList', () => {
    describe('constructor', () => {
        it('constructs an empty list', () => {
            const testList = new SinglyLinkedList();
            expect(testList).toMatchInlineSnapshot(`
                SinglyLinkedList {
                  "head": null,
                }
            `);
        });

        it('constructs a singly-linked list from a node', () => {
            const testList = new SinglyLinkedList(
                new SinglyLinkedListNode(
                    1,
                    new SinglyLinkedListNode(2, new SinglyLinkedListNode(3)),
                ),
            );

            expect(testList).toMatchInlineSnapshot(`
                SinglyLinkedList {
                  "head": SinglyLinkedListNode {
                    "next": SinglyLinkedListNode {
                      "next": SinglyLinkedListNode {
                        "next": null,
                        "value": 3,
                      },
                      "value": 2,
                    },
                    "value": 1,
                  },
                }
            `);
        });

        it('construct a singly-linked list from an array', () => {
            const testList = new SinglyLinkedList([1, 2, 3]);
            expect(testList).toMatchInlineSnapshot(`
                SinglyLinkedList {
                  "head": SinglyLinkedListNode {
                    "next": SinglyLinkedListNode {
                      "next": SinglyLinkedListNode {
                        "next": null,
                        "value": 3,
                      },
                      "value": 2,
                    },
                    "value": 1,
                  },
                }
            `);
        });
    });

    describe('toArray', () => {
        it('returns the list as an array', () => {
            const testList = new SinglyLinkedList(
                new SinglyLinkedListNode(
                    1,
                    new SinglyLinkedListNode(2, new SinglyLinkedListNode(3)),
                ),
            );
            expect(testList.toArray()).toStrictEqual([1, 2, 3]);
        });

        it('returns the list as an array when instantiated as an array', () => {
            const testListArray = [0, 1, 2, 3];
            const testList = new SinglyLinkedList(testListArray);
            expect(testList.toArray()).toStrictEqual(testListArray);
        });
    });

    describe('getNodeAtIndex', () => {
        it('returns null if the specified index is negative', () => {
            const testList = new SinglyLinkedList();
            expect(testList.getNodeAtIndex(-1)).toBeNull();
        });

        it('returns null if the specified index is out of bounds', () => {
            const testList = new SinglyLinkedList([0, 1, 2, 3, 4]);
            expect(testList.getNodeAtIndex(5)).toBeNull();
        });

        it('returns the node at the specified index', () => {
            const testList = new SinglyLinkedList([0, 1, 2, 3, 4]);
            expect(testList.getNodeAtIndex(2)).toMatchInlineSnapshot(`
                SinglyLinkedListNode {
                  "next": SinglyLinkedListNode {
                    "next": SinglyLinkedListNode {
                      "next": null,
                      "value": 4,
                    },
                    "value": 3,
                  },
                  "value": 2,
                }
            `);
        });
    });
});
