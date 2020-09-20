import {
    getBinaryTreeNodesInOrder,
    getBinaryTreeNodesPostOrder,
    getBinaryTreeNodesPreOrder,
} from '../binTreeTraversal';
import BinTreeNode from '../BinTreeNode';

/**
 * A common binary search tree so we can see how traversal orders compare. This
 * is a "perfect" binary search tree, i.e., it's both "complete" and "full".
 *
 *               7
 *              / \
 *             /   \
 *            /     \
 *           /       \
 *          /         \
 *         /           \
 *        /             \
 *       3               11
 *      / \             /  \
 *     /   \           /    \
 *    /     \         /      \
 *   1       5       9       13
 *  / \     / \     / \      / \
 * 0   2   4   6   8   10   12  14
 */
const perfectBinarySearchTree: BinTreeNode = new BinTreeNode(
    7,
    new BinTreeNode(
        3,
        new BinTreeNode(1, new BinTreeNode(0), new BinTreeNode(2)),
        new BinTreeNode(5, new BinTreeNode(4), new BinTreeNode(6)),
    ),
    new BinTreeNode(
        11,
        new BinTreeNode(9, new BinTreeNode(8), new BinTreeNode(10)),
        new BinTreeNode(13, new BinTreeNode(12), new BinTreeNode(14)),
    ),
);

describe('getBinaryTreeNodesInOrder', () => {
    it('returns the nodes of a binary tree in-order', () => {
        expect(
            getBinaryTreeNodesInOrder(perfectBinarySearchTree),
        ).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    });
});

describe('getBinaryTreeNodesPreOrder', () => {
    it('returns the nodes of a binary tree pre-order', () => {
        expect(
            getBinaryTreeNodesPreOrder(perfectBinarySearchTree),
        ).toStrictEqual([7, 3, 1, 0, 2, 5, 4, 6, 11, 9, 8, 10, 13, 12, 14]);
    });
});

describe('getBinaryTreeNodesPostOrder', () => {
    it('returns the nodes of a binary tree post-order', () => {
        expect(
            getBinaryTreeNodesPostOrder(perfectBinarySearchTree),
        ).toStrictEqual([0, 2, 1, 4, 6, 5, 3, 8, 10, 9, 12, 14, 13, 11, 7]);
    });
});
