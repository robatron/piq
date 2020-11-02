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
    let leftChild = null;
    let rightChild = null;

    // Base case: return immediately if no root value
    if (rootVal === null || rootVal === undefined) {
        return;
    }

    // If there's a left child value, create a left node
    if (binTreeArray[1]) {
        const leftChildIdx = rootIndex + Math.pow(2, rootIndex);
        const leftChildLeftIdx = leftChildIdx + Math.pow(2, leftChildIdx);
        const leftChildRightIdx = leftChildIdx + Math.pow(2, leftChildIdx) + 1;

        leftChild = cn(binTreeArray[leftChildIdx]);

        // If there's a left grandchild value, recursively call minimalTree
        // with it as the root
        if (binTreeArray[leftChildLeftIdx]) {
            leftChild.setLeftChild(minimalTree(binTreeArray, leftChildLeftIdx));
        }

        // If there's a right grandchild value, recursively call minimalTree
        // with it as the root
        if (binTreeArray[leftChildRightIdx]) {
            leftChild.setRightChild(
                minimalTree(binTreeArray, leftChildRightIdx),
            );
        }
    }

    if (binTreeArray[2]) {
        const rightChildIdx = rootIndex + Math.pow(2, rootIndex) + 1;
        const rightChildLeftIdx = rightChildIdx + Math.pow(2, rightChildIdx);
        const rightChildRightIdx =
            rightChildIdx + Math.pow(2, rightChildIdx) + 1;

        rightChild = cn(binTreeArray[rightChildIdx]);

        if (binTreeArray[rightChildLeftIdx]) {
            leftChild.setLeftChild(
                minimalTree(binTreeArray, rightChildLeftIdx),
            );
        }

        if (binTreeArray[rightChildRightIdx]) {
            leftChild.setRightChild(
                minimalTree(binTreeArray, rightChildRightIdx),
            );
        }
    }

    return cn(rootVal, leftChild, rightChild);
};
