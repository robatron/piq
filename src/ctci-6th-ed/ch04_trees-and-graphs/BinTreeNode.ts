// A binary tree node
export default class BinTreeNode {
    value: number;
    leftNode: BinTreeNode;
    rightNode: BinTreeNode;

    constructor(
        value: number,
        leftNode: BinTreeNode = null,
        rightNode: BinTreeNode = null,
    ) {
        this.value = value;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}
