// This file contains common binary tree utilities

import BinTreeNode from './BinTreeNode';

/**
 * Returns if a binary tree is "complete", i.e., a binary tree that is
 * completely filled except for the rightmost elements of the final level.
 */
export const isCompleteBinTree = (binTree: BinTreeNode): boolean => {
    // If the tree is completely empty, consider it complete
    if (!binTree) {
        return true;
    }

    // The search queue to track which nodes to search next. Node: If you use
    // `unshift` and `pop`, an array acts like a queue. If you use
    const searchQueue: BinTreeNode[] = [binTree];

    // Keep track of when we encounter missing nodes
    let isMissingNode = false;

    // Do a breadth-first search through the tree, and look for missing nodes
    while (searchQueue.length > 0) {
        const curNode = searchQueue.pop();
        const leftChild = curNode.getLeftChild();
        const rightChild = curNode.getRightChild();

        // If there is a left node, check if there has been a missing node, and
        // return false if there has. Otherwise, push it onto the search queue.
        if (leftChild) {
            if (isMissingNode) {
                return false;
            }
            searchQueue.unshift(leftChild);
        } else {
            isMissingNode = true;
        }

        if (rightChild) {
            if (isMissingNode) {
                return false;
            }
            searchQueue.unshift(rightChild);
        } else {
            isMissingNode = true;
        }
    }

    return true;
};

/**
 * Insert a node into the bottom-rightmost position of a complete binary tree
 * IN-PLACE.
 *
 * @param completeBinTree   The complete binary tree in which to insert the
 *                          target node. WARNING: This will be modified.
 * @param target            The node to insert into the tree. Must be childness.
 */
export const appendToCompleteBinTree = (
    completeBinTree: BinTreeNode,
    target: BinTreeNode,
): BinTreeNode => {
    if (!isCompleteBinTree(completeBinTree)) {
        throw new Error('Binary tree must be "complete"');
    }

    if (!target.isChildless()) {
        throw new Error('Target node must be childless');
    }

    // If the bin tree is null, just return the target
    if (!completeBinTree) {
        return target;
    }

    // Breath-first search the binary tree and insert the target node into the
    // first empty position
    const searchStack: BinTreeNode[] = [completeBinTree];
    while (searchStack.length > 0) {
        const curNode = searchStack.pop();
        const rightChild = curNode.getRightChild();
        const leftChild = curNode.getLeftChild();

        // If we encounter an empty left child, insert the target immediately
        if (leftChild) {
            searchStack.unshift(leftChild);
        } else {
            curNode.setLeftChild(target);
            break;
        }

        // If we encounter an empty right child, insert the target there,
        // unless the left child is also empty, in which case we'll insert it
        // there instead
        if (rightChild) {
            searchStack.unshift(rightChild);
        } else {
            if (!leftChild) {
                curNode.setLeftChild(target);
            } else {
                curNode.setRightChild(target);
            }
            break;
        }
    }

    return completeBinTree;
};
