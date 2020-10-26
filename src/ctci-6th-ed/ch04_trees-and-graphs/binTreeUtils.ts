// This file contains common binary tree utilities

import { getBinTreeDisplayLines } from './binTreeDisplay';
import BinTreeNode, { ChildType } from './BinTreeNode';

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
    const searchQueue: BinTreeNode[] = [completeBinTree];
    while (searchQueue.length > 0) {
        const curNode = searchQueue.pop();
        const rightChild = curNode.getRightChild();
        const leftChild = curNode.getLeftChild();

        // If we encounter an empty left child, insert the target immediately
        if (leftChild) {
            searchQueue.unshift(leftChild);
        } else {
            curNode.setLeftChild(target);
            break;
        }

        // If we encounter an empty right child, insert the target there,
        // unless the left child is also empty, in which case we'll insert it
        // there instead
        if (rightChild) {
            searchQueue.unshift(rightChild);
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

/**
 * Return the last node in a complete binary tree, i.e., the bottom-rightmost
 */
export const getLastNodeInCompleteBinTree = (
    completeBinTree: BinTreeNode,
): BinTreeNode => {
    if (!completeBinTree) {
        return null;
    }

    if (!isCompleteBinTree(completeBinTree)) {
        throw new Error('Binary tree must be "complete"');
    }

    // Breath-first search through the tree until we find the last node
    let lastNode = completeBinTree;
    const searchQueue: BinTreeNode[] = [completeBinTree];
    while (searchQueue.length > 0) {
        const curNode = searchQueue.pop();
        const leftChild = curNode.getLeftChild();
        const rightChild = curNode.getRightChild();

        lastNode = curNode;

        if (leftChild) {
            searchQueue.unshift(leftChild);
        }

        if (rightChild) {
            searchQueue.unshift(rightChild);
        }
    }

    return lastNode;
};

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
 * Swap two nodes in a binary tree, i.e., their children and parents
 *
 * @param nodeA
 * @param nodeB
 */
export const swapBinTreeNodes = (
    nodeA: BinTreeNode,
    nodeB: BinTreeNode,
): void => {
    // Capture references to both nodes' relatives so we don't have to worry
    // about the order, or overwriting them as we swap
    const relA = {
        parent: nodeA.getParent(),
        childType: nodeA.getChildType(),
        leftChild: nodeA.getLeftChild(),
        rightChild: nodeA.getRightChild(),
    };
    const relB = {
        parent: nodeB.getParent(),
        childType: nodeB.getChildType(),
        leftChild: nodeB.getLeftChild(),
        rightChild: nodeB.getRightChild(),
    };

    // Abandon their children to make room for adopting the other's
    nodeA.abandonChildren();
    nodeB.abandonChildren();

    // A adopts B's children if it has any
    if (relB.leftChild) {
        nodeA.setLeftChild(relB.leftChild);
    }
    if (relB.rightChild) {
        nodeA.setRightChild(relB.rightChild);
    }

    // B adopts A's children if it has any
    if (relA.leftChild) {
        nodeB.setLeftChild(relA.leftChild);
    }
    if (relA.rightChild) {
        nodeB.setRightChild(relA.rightChild);
    }

    // Renounce their parents so they can be adopted by the other
    nodeA.emancipate();
    nodeB.emancipate();

    // Reparent A: B's parent adopts A if it's not the root, unless A is the
    // parent, in which case make B the parent of A
    if (relB.parent) {
        if (relB.childType === ChildType.left) {
            if (relB.parent !== nodeA) {
                relB.parent.setLeftChild(nodeA);
            } else {
                nodeB.setLeftChild(nodeA);
            }
        } else if (relB.childType === ChildType.right) {
            if (relB.parent !== nodeA) {
                relB.parent.setRightChild(nodeA);
            } else {
                nodeB.setRightChild(nodeA);
            }
        }
    }

    // Reparent B: A's parent adopts B if it's not the root, unless B is the
    // parent, in which case make A the parent of B
    if (relA.parent) {
        if (relA.childType === ChildType.left) {
            if (relA.parent !== nodeB) {
                relA.parent.setLeftChild(nodeB);
            } else {
                nodeA.setLeftChild(nodeB);
            }
        } else if (relA.childType === ChildType.right) {
            if (relA.parent !== nodeB) {
                relA.parent.setRightChild(nodeB);
            } else {
                nodeA.setRightChild(nodeB);
            }
        }
    }
};
