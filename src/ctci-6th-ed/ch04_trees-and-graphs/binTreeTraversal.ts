import BinTreeNode from './BinTreeNode';

/**
 * Binary trees can be traversed in the following orders:
 *
 * - In-order (most common)
 * - Pre-order
 * - Post-order
 */

// Traverse a binary tree in-order (left node, current node, right node)
export const getBinaryTreeNodesInOrder = (BTree: BinTreeNode) => {
    let nodeValues: number[] = [];
    if (BTree !== null) {
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesInOrder(BTree.leftNode),
        );
        nodeValues.push(BTree.value);
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesInOrder(BTree.rightNode),
        );
    }
    return nodeValues;
};

// Traverse a binary tree pre-order (current node, left node, right node)
export const getBinaryTreeNodesPreOrder = (BTree: BinTreeNode) => {
    let nodeValues: number[] = [];
    if (BTree !== null) {
        nodeValues.push(BTree.value);
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPreOrder(BTree.leftNode),
        );
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPreOrder(BTree.rightNode),
        );
    }
    return nodeValues;
};

// Traverse a binary tree post-order (left node, right node, current node)
export const getBinaryTreeNodesPostOrder = (BTree: BinTreeNode) => {
    let nodeValues: number[] = [];
    if (BTree !== null) {
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPostOrder(BTree.leftNode),
        );
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPostOrder(BTree.rightNode),
        );
        nodeValues.push(BTree.value);
    }
    return nodeValues;
};
