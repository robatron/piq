// A binary tree node
export default class BinTreeNode {
    value: number | string;
    leftNode: BinTreeNode;
    rightNode: BinTreeNode;

    constructor(
        value: number | string,
        leftNode: BinTreeNode = null,
        rightNode: BinTreeNode = null,
    ) {
        this.value = value;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

// Helper function to create a new binary tree node
export const cn = (
    v: number | string,
    l: BinTreeNode = null,
    r: BinTreeNode = null,
): BinTreeNode => new BinTreeNode(v, l, r);
