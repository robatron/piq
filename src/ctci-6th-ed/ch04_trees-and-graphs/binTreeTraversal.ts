import BinTreeNode from './BinTreeNode';

/**
 * Binary trees can be traversed in the following orders depth-first orders:
 *
 * - In-order (most common, what most people mean by "DFS")
 * - Pre-order (directory tree-style)
 * - Post-order (rare)
 */

// Traverse a binary tree in-order (left node, current node, right node)
export const getBinaryTreeNodesInOrder = (
    BTree: BinTreeNode,
): (number | string)[] => {
    let nodeValues: (number | string)[] = [];
    if (BTree) {
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesInOrder(BTree.getLeftChild()),
        );
        nodeValues.push(BTree.value);
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesInOrder(BTree.getRightChild()),
        );
    }
    return nodeValues;
};

// Traverse a binary tree pre-order (current node, left node, right node)
export const getBinaryTreeNodesPreOrder = (
    BTree: BinTreeNode,
): (number | string)[] => {
    let nodeValues: (number | string)[] = [];
    if (BTree) {
        nodeValues.push(BTree.value);
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPreOrder(BTree.getLeftChild()),
        );
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPreOrder(BTree.getRightChild()),
        );
    }
    return nodeValues;
};

// Traverse a binary tree pre-order iteratively
export const getBinaryTreeNodesPreOrderIter = (
    BTree: BinTreeNode,
): (number | string)[] => {
    const nodeValues: (number | string)[] = [];
    const traversalStack: BinTreeNode[] = [BTree];

    while (traversalStack.length > 0) {
        const curNode = traversalStack.pop();
        const rightChild = curNode.getRightChild();
        const leftChild = curNode.getLeftChild();

        nodeValues.push(curNode.value);

        if (rightChild) {
            traversalStack.push(rightChild);
        }

        if (leftChild) {
            traversalStack.push(leftChild);
        }
    }

    return nodeValues;
};

// Traverse a binary tree post-order (left node, right node, current node)
export const getBinaryTreeNodesPostOrder = (
    BTree: BinTreeNode,
): (number | string)[] => {
    let nodeValues: (number | string)[] = [];
    if (BTree) {
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPostOrder(BTree.getLeftChild()),
        );
        nodeValues = nodeValues.concat(
            getBinaryTreeNodesPostOrder(BTree.getRightChild()),
        );
        nodeValues.push(BTree.value);
    }
    return nodeValues;
};
