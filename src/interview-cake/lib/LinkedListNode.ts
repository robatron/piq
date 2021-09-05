export const valsToLinkedListNodes = (
    vals: unknown[],
): LinkedListNode<unknown>[] => {
    const nodes: LinkedListNode<unknown>[] = [];

    for (let i = 0; i < vals.length; i++) {
        const curVal = vals[i];
        const node = new LinkedListNode<typeof curVal>(curVal);

        if (i > 0) {
            nodes[i - 1].next = node;
        }

        nodes.push(node);
    }

    return nodes;
};

export default class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T>;

    constructor(v: T, n?: LinkedListNode<T>) {
        this.value = v;
        this.next = n;
    }
}
