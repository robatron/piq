// Shorthand for creating a binary tree with BinTreeNodes
export const cn = <T>(
    v?: T,
    l?: BinTreeNode<T>,
    r?: BinTreeNode<T>,
): BinTreeNode<T> => new BinTreeNode<T>(v, l, r);

// Simple binary tree node class
export default class BinTreeNode<T> {
    value: T;
    left: BinTreeNode<T>;
    right: BinTreeNode<T>;

    constructor(value: T, left?: BinTreeNode<T>, right?: BinTreeNode<T>) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
