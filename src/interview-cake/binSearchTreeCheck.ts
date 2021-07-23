import BinTreeNode from './lib/BinTreeNode';

/*
Write a function to check that a binary tree is a valid binary search tree.

https://www.interviewcake.com/question/javascript/bst-checker?course=fc1&section=trees-graphs
*/

// Recursively return the values from a binary search tree in order
export const getBinSearchTreeValsInOrder = (
    root: BinTreeNode<number>,
): number[] => [
    ...(root.left ? getBinSearchTreeValsInOrder(root.left) : []),
    root.value,
    ...(root.right ? getBinSearchTreeValsInOrder(root.right) : []),
];

// Return if a binary tree is a binary search tree using a sorted check
// Time complexity: O(2n) = O(n)
// Space complexity: O(n)
export const binSearchTreeCheckSort = (root: BinTreeNode<number>): boolean => {
    const sortedValues: number[] = getBinSearchTreeValsInOrder(root);
    let lastVal = sortedValues[0];

    for (let i = 1; i < sortedValues.length; i++) {
        const curVal = sortedValues[i];

        if (curVal <= lastVal) {
            return false;
        }

        lastVal = curVal;
    }

    return true;
};

// Return if a binary tree is a binary search tree using iterative DFS
// Time complexity: O(n)
// Space complexity: O(d) where d is max tree depth
const binSearchTreeCheckDFS = (root: BinTreeNode<number>): boolean => {
    const stack: {
        node: BinTreeNode<number>;
        lowerBound: number;
        upperBound: number;
    }[] = [{ node: root, lowerBound: -Infinity, upperBound: Infinity }];

    while (stack.length) {
        const { node, lowerBound, upperBound } = stack.pop();

        // Return false immediately if node is out of bounds
        if (!(node.value > lowerBound && node.value < upperBound)) {
            return false;
        }

        if (node.left) {
            stack.push({
                node: node.left,
                lowerBound,
                upperBound: node.value,
            });
        }

        if (node.right) {
            stack.push({
                node: node.right,
                lowerBound: node.value,
                upperBound,
            });
        }
    }

    return true;
};

export default binSearchTreeCheckDFS;
