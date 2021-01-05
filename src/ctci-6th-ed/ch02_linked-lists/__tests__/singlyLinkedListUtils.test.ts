import {
    arrayToSinglyLinkedListNode,
    singlyLinkedListNodeToArray,
} from '../singlyLinkedListUtils';
import { SinglyLinkedListNode } from '../SinglyLinkedList';

describe('singlyLinkedListNodeToArray', () => {
    it('returns a list as an array', () => {
        const testList = new SinglyLinkedListNode(
            0,
            new SinglyLinkedListNode(1, new SinglyLinkedListNode(2)),
        );
        expect(singlyLinkedListNodeToArray(testList)).toStrictEqual([0, 1, 2]);
    });

    it('returns a single-element array for a single-element list', () => {
        const testList = new SinglyLinkedListNode(1);
        expect(singlyLinkedListNodeToArray(testList)).toStrictEqual([1]);
    });

    it('returns an empty array for an empty list', () => {
        const testList = new SinglyLinkedListNode();
        expect(singlyLinkedListNodeToArray(testList)).toStrictEqual([]);
    });

    it('returns an empty array for an undefined head node', () => {
        expect(singlyLinkedListNodeToArray(undefined)).toStrictEqual([]);
    });
});

describe('arrayToSinglyLinkedListNode', () => {
    it('constructs a list from an array', () => {
        expect(arrayToSinglyLinkedListNode([1, 2, 3])).toMatchInlineSnapshot(`
            SinglyLinkedListNode {
              "next": SinglyLinkedListNode {
                "next": SinglyLinkedListNode {
                  "next": null,
                  "value": 3,
                },
                "value": 2,
              },
              "value": 1,
            }
        `);
    });

    it('returns a single node for a single element', () => {
        expect(arrayToSinglyLinkedListNode([1])).toMatchInlineSnapshot(`
            SinglyLinkedListNode {
              "next": null,
              "value": 1,
            }
        `);
    });

    it('returns a single empty node for no array', () => {
        expect(arrayToSinglyLinkedListNode()).toMatchInlineSnapshot(`
            SinglyLinkedListNode {
              "next": null,
              "value": null,
            }
        `);
    });
});
