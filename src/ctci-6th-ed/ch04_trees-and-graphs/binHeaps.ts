/**
 * This file contains functions related to binary heaps. Binary heaps are
 * complete binary trees (i.e., binary trees that are completely filled other
 * than the rightmost elements of the final level) where each node is either:
 *
 *  - Larger than all its children (max-heap)
 *  - Smaller than all its children (min-heap)
 *
 * There are two primary operations of binary heaps: insert and extract min/max.
 */
import { appendToCompleteBinTree, isCompleteBinTree } from './binTreeUtils';
import BinTreeNode, { ChildType } from './BinTreeNode';
import { getBinTreeDisplayLines } from './binTreeDisplay';

/**
 * Max or min heap
 */
export enum HeapType {
    max,
    min,
}

/**
 * Tests a binary tree to see if it's a valid min or max heap. Both types of
 * heaps are complete binary trees. The differences are that each node of a...
 *
 *  - max-heap is larger than or equal to its children (decending order)
 *  - min-heap is smaller than or equal to its children (ascending order)
 *
 * @param heapTree Root of the target binary tree
 */
export const isValidHeap = (
    heapType: HeapType,
    heapTree: BinTreeNode,
): boolean => {
    const childNodeAccessors = ['getLeftChild', 'getRightChild'];
    const searchStack: BinTreeNode[] = [heapTree];

    // Min-heaps must be complete
    if (!isCompleteBinTree(heapTree)) {
        return false;
    }

    // Depth-first search the whole tree, verify every node is smaller than its
    // children.
    while (searchStack.length > 0) {
        const curNode = searchStack.pop();

        for (let i = 0; i < childNodeAccessors.length; ++i) {
            const childNode = curNode[childNodeAccessors[i]]();

            if (childNode) {
                const satisfiesHeapRule =
                    heapType === HeapType.max
                        ? curNode.value >= childNode.value
                        : curNode.value <= childNode.value;

                if (!satisfiesHeapRule) {
                    return false;
                }

                searchStack.push(childNode);
            }
        }
    }

    return true;
};

/**
 * Inserts a node into a heap and returns the new heap.
 *
 * @param heapType Heap type, min or max
 * @param heapTree Root of the target heap tree. WARNING: This may be modified!
 * @param target The target node to insert into the heap. Must be childless.
 */
export const insert = (
    heapType: HeapType,
    heapTree: BinTreeNode,
    target: BinTreeNode,
): BinTreeNode => {
    // Validate the heap and target
    if (!isValidHeap(heapType, heapTree)) {
        const heapTypeName = HeapType[heapType];
        throw new Error(`Insert failed. Invalid ${heapTypeName} heap.`);
    }

    if (!target.isChildless()) {
        throw new Error('Target must be childless');
    }

    // Insert the target node into the bottom-rightmost position in the tree to
    // maintain the tree's completeness property
    heapTree = appendToCompleteBinTree(heapTree, target);

    // Do until either the target has no parent, or until the target no longer
    // needs to be swapped with the parent.
    //  - For max-heaps, every parent should be > all children
    //  - For min-heaps, every parent should be < children
    while (
        target.parent && heapType === HeapType.max
            ? target.value > target.parent?.value
            : target.value < target.parent?.value
    ) {
        const parent = target.parent;
        const grandparent = parent?.parent;

        // Target orphans its children, then adopts its parent and sibling
        const targetLeftOrphan = target.getLeftChild();
        const targetRightOrphan = target.getRightChild();

        if (target.childType === ChildType.left) {
            target.setLeftChild(parent);
            target.setRightChild(parent.getRightChild());
        } else {
            target.setRightChild(parent);
            target.setLeftChild(parent.getLeftChild());
        }

        // The parent adopts target's orphaned children
        parent.setLeftChild(targetLeftOrphan);
        parent.setRightChild(targetRightOrphan);

        // If there's a grandparent, it adopts target
        if (grandparent) {
            if (parent.childType === ChildType.left) {
                grandparent.setLeftChild(target);
            } else {
                grandparent.setRightChild(target);
            }
        }

        // Else there's no grandparent, so promote the target to the root
        // of the heap and emancipate it
        else {
            target.emancipate();
            heapTree = target;
        }
    }

    // Return the tree even though we modified the original. This is required
    // in case our target becomes the root of the heap tree, which can't be
    // captured by in-place changes.
    return heapTree;
};
