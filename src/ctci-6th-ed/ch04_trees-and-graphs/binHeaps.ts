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
import {
    appendToCompleteBinTree,
    getLastNodeInCompleteBinTree,
    isCompleteBinTree,
    swapBinTreeNodes,
} from './binTreeUtils';
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
 * Determine of the parent should swap with the child given the heap type
 *
 * @param parent Parent node
 * @param child Specific child node
 * @param heapType Type of heap
 */
const shouldSwap = (
    parent: BinTreeNode,
    child: BinTreeNode,
    heapType: HeapType,
): boolean =>
    heapType === HeapType.max
        ? child?.value > parent?.value
        : child?.value < parent?.value;

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
                if (shouldSwap(curNode, childNode, heapType)) {
                    return false;
                }
                searchStack.push(childNode);
            }
        }
    }

    return true;
};

/**
 * Extracts the topmost node of a heap, and rearranges the heap to maintain
 * min/max heapedness.
 *
 * @param heapRoot  The target heap's root. This MAY BE MODIFIED.
 * @param heapType  The heap type, min or max
 */
export const extract = (
    heapType: HeapType,
    heapRoot: BinTreeNode,
): [BinTreeNode, BinTreeNode] => {
    // Validate the heap
    if (!isValidHeap(heapType, heapRoot)) {
        const heapTypeName = HeapType[heapType];
        throw new Error(`Extract failed. Invalid ${heapTypeName} heap.`);
    }

    // If the root node is the only node in the heap, there's nothing to do
    if (heapRoot.isChildless()) {
        return [heapRoot, heapRoot];
    }

    // Swap the heap's root and last nodes
    const lastNode = getLastNodeInCompleteBinTree(heapRoot);
    swapBinTreeNodes(heapRoot, lastNode);

    // Emancipate the heapRoot after the swap since it should now be in the
    // last position to prepare for reordering of the heap
    heapRoot.emancipate();

    // Track the new root, which is now lastNode after the swap
    let newHeap = lastNode;
    let newHeapUpdatedOnce = false;

    // Now that lastNode is in the root position, we need to swap it with its
    // children until it's in the appropriate position.
    //  - For max-heaps, lastNode must be > than all of its children
    //  - For min-heaps, lastNode must be < than all of its children
    while (
        shouldSwap(lastNode, lastNode.getLeftChild(), heapType) ||
        shouldSwap(lastNode, lastNode.getRightChild(), heapType)
    ) {
        const leftChild = lastNode.getLeftChild();
        const rightChild = lastNode.getRightChild();
        const childToSwap = shouldSwap(lastNode, leftChild, heapType)
            ? leftChild
            : rightChild;

        swapBinTreeNodes(lastNode, childToSwap);

        if (!newHeapUpdatedOnce) {
            newHeap = childToSwap;
            newHeapUpdatedOnce = true;
        }
    }

    // Finally, return the emancipated heapRoot
    return [heapRoot, newHeap];
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
        target.getParent() && heapType === HeapType.max
            ? target.value > target.getParent()?.value
            : target.value < target.getParent()?.value
    ) {
        const parent = target.getParent();
        const grandparent = parent?.getParent();

        swapBinTreeNodes(parent, target);

        // If the target has no grandparent, promote it to the root of the heap
        // and emancipate it
        if (!grandparent) {
            target.emancipate();
            heapTree = target;
        }
    }

    // Return the tree even though we modified the original. This is required
    // in case our target becomes the root of the heap tree, which can't be
    // captured by in-place changes.
    return heapTree;
};
