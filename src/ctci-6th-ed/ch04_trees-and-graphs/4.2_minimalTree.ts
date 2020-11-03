import BinTreeNode, { cn } from './BinTreeNode';

/**
 * 4.2 - Minimal Tree
 *
 * Given a sorted (increasing order) array with unique integer elements, write
 * an algorithm to create a binary search tree with minimal height.
 */
export const minimalTree = (
    binTreeArray: number[],
    rootIndex = 0,
): BinTreeNode => {
    const rootVal = binTreeArray[rootIndex];

    // Base case: return immediately if no root value
    if (typeof rootVal !== 'number') {
        return;
    }

    const leftChildIdx = 2 * rootIndex + 1;
    const rightChildIdx = 2 * rootIndex + 2;

    const leftChild = minimalTree(binTreeArray, leftChildIdx);
    const rightChild = minimalTree(binTreeArray, rightChildIdx);

    return cn(rootVal, leftChild, rightChild);
};
