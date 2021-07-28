import BinTreeNode from './lib/BinTreeNode';
/*
Write a function to find the 2nd largest element in a binary search tree

TODO:

A clean recursive implementation will take O(h) space in the call
stack, but we can bring our algorithm down to O(1) space overall.

https://www.interviewcake.com/question/javascript/second-largest-item-in-bst?course=fc1&section=trees-graphs
*/

// Recursively return nodes of a binary search tree in descending order (not used)
export const getBinSearchTreeNodesInDescOrder = (
    root: BinTreeNode<number>,
): BinTreeNode<number>[] => [
    ...(root.right ? getBinSearchTreeNodesInDescOrder(root.right) : []),
    root,
    ...(root.left ? getBinSearchTreeNodesInDescOrder(root.left) : []),
];

// Time: O(h) where 'h' is height of tree
// Space: O(1) - only holding two constant values
export default (root: BinTreeNode<number>): BinTreeNode<number> => {
    let curNode: BinTreeNode<number> = root;
    let prevNode: BinTreeNode<number>;

    while (curNode) {
        // If there's a right path, take it to find larger values
        if (curNode.right) {
            prevNode = curNode;
            curNode = curNode.right;
        }

        // If there's only a left path, the 2nd largest is the largest in the
        // left path
        else if (curNode.left) {
            let curLeftPathNode = curNode.left;
            while (curLeftPathNode) {
                if (!curLeftPathNode.right) {
                    return curLeftPathNode;
                }
                curLeftPathNode = curLeftPathNode.right;
            }
        }

        // Otherwise this is a leaf node from a right path and the 2nd largest
        // is the previous node
        else {
            return prevNode;
        }
    }
};
