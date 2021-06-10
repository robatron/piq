import kthToLastNode, { LinkedListNode } from '../kthToLastNode';

describe('kthToLastNode', () => {
    const a = new LinkedListNode<string>('Angel Food');
    const b = new LinkedListNode<string>('Bundt');
    const c = new LinkedListNode<string>('Cheese');
    const d = new LinkedListNode<string>("Devil's Food");
    const e = new LinkedListNode<string>('Eccles');

    a.next = b;
    b.next = c;
    c.next = d;
    d.next = e;

    it('returns the kth to last node in a linked list', () => {
        expect(kthToLastNode(2, a)).toBe(d);
    });

    it('returns the last node', () => {
        expect(kthToLastNode(1, a)).toBe(e);
    });

    it('returns the 1st node', () => {
        expect(kthToLastNode(5, a)).toBe(a);
    });

    it('returns undefined if k > linked list length', () => {
        expect(kthToLastNode(100, a)).toBeUndefined();
    });
});
