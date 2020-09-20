/**
 * Write a program to draw a binary tree with fixed width fonts. Represent left
 * links with a `/` and right link with `\`. Assume values are single
 * characters or `null`. Example:
 *
 *       1
 *      / \
 *     /   \
 *    2     \
 *   / \     3
 *  4   5   / \
 *         9   \
 *              8
 *             / \
 *            6   7
 *
 * Advanced problem: handle multiple-character values.
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
 *
 * Problem based on
 * http://www.dsalgo.com/2016/01/draw-binary-tree-with-ascii.html
 */

import BinTreeNode from './BinTreeNode';

// Return the lines of an ASCII-art representation of a binary tree
export const getBinTreeDisplayLines = (binTree: BinTreeNode): string[] => {};
