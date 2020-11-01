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
    const rootVal = binTreeArray[0];
    let leftChild = null;
    let rightChild = null;

    // Base case: return immediately if no root value
    if (rootVal === null || rootVal === undefined) {
        return;
    }

    // If there's a left child value, create a left node
    if (binTreeArray[1]) {
        const leftChildIdx = 1;
        const leftChildLeftIdx = 2 * leftChildIdx + 1;
        const leftChildRightIdx = 2 * leftChildIdx + 2;

        leftChild = cn(binTreeArray[leftChildIdx]);

        // If there's a left grandchild value, recursively call minimalTree
        // with it as the root
        if (binTreeArray[leftChildLeftIdx]) {
            leftChild.setLeftChild(
                minimalTree(binTreeArray.slice(leftChildIdx)),
            );
        }

        // If there's a right grandchild value, recursively call minimalTree
        // with it as the root
        if (binTreeArray[leftChildRightIdx]) {
            leftChild.setRightChild(
                minimalTree(binTreeArray.slice(leftChildRightIdx)),
            );
        }
    }

    if (binTreeArray[2]) {
        rightChild = cn(binTreeArray[2]);

        if (binTreeArray[5]) {
            leftChild.setLeftChild(minimalTree(binTreeArray.slice(5)));
        }

        if (binTreeArray[6]) {
            leftChild.setRightChild(minimalTree(binTreeArray.slice(6)));
        }
    }

    return cn(rootVal, leftChild, rightChild);
};
