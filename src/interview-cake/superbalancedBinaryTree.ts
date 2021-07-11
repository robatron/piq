/*
Write a function to see if a binary tree is "superbalanced" (a new tree property
we just made up).

A tree is "superbalanced" if the difference between the depths of any two leaf
nodes is no greater than one.

Here's a sample binary tree node class:

    class BinaryTreeNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        insertLeft(value) {
            this.left = new BinaryTreeNode(value);
            return this.left;
        }

        insertRight(value) {
            this.right = new BinaryTreeNode(value);
            return this.right;
        }
    }

https://www.interviewcake.com/question/javascript/balanced-binary-tree?course=fc1&section=trees-graphs
*/

// Simple binary tree node class
export class BinTreeNode<T> {
    value: T;
    left: BinTreeNode<T>;
    right: BinTreeNode<T>;

    constructor(value: T, left?: BinTreeNode<T>, right?: BinTreeNode<T>) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

// Shorthand for creating a binary tree with BinTreeNodes
export const cn = <T>(
    v?: T,
    l?: BinTreeNode<T>,
    r?: BinTreeNode<T>,
): BinTreeNode<T> => new BinTreeNode<T>(v, l, r);

// Find the min and max leaf depths using recursive DFS (part of deprecated
// approach)
const getMinMaxLeafDepth = <T>(
    root: BinTreeNode<T>,
    level = 0,
    minLeafDepth = Infinity,
    maxLeafDepth = 0,
): [number, number] => {
    // If root is a leaf, update and return the min and max leaf depths
    if (!root.left && !root.right) {
        return [Math.min(minLeafDepth, level), Math.max(maxLeafDepth, level)];
    }

    let leftMinMaxLeafDepth: [number, number];
    let rightMinMaxLeafDepth: [number, number];

    if (root.left) {
        leftMinMaxLeafDepth = getMinMaxLeafDepth(
            root.left,
            level + 1,
            minLeafDepth,
            maxLeafDepth,
        );
    }

    if (root.right) {
        rightMinMaxLeafDepth = getMinMaxLeafDepth(
            root.right,
            level + 1,
            minLeafDepth,
            maxLeafDepth,
        );
    }

    return [
        Math.min(leftMinMaxLeafDepth[0], rightMinMaxLeafDepth[0]),
        Math.max(leftMinMaxLeafDepth[1], rightMinMaxLeafDepth[1]),
    ];
};

// Return if the given tree is superbalanced or not using iterative DFS
const isBinTreeSuperbalanced = <T>(root: BinTreeNode<T>): boolean => {
    // Track the deepest and shallowest leaf depths
    let minLeafDepth = Infinity;
    let maxLeafDepth = 0;

    // A stack can be used for iterative DFS. In this case, we'll store the node
    // and its level
    const stack: { node: BinTreeNode<T>; level: number }[] = [
        {
            node: root,
            level: 0,
        },
    ];

    // While the stack contains nodes to search, pop the next one and inspect it
    while (stack.length) {
        const { node, level } = stack.pop();

        // If this is a leaf node, update the min and max leaf depths. We can
        // tell the tree is not superbalanced if the min and max depths are > 1
        // at anytime, so we can return false immediately if we encounter that
        if (!node.left && !node.right) {
            minLeafDepth = Math.min(minLeafDepth, level);
            maxLeafDepth = Math.max(maxLeafDepth, level);

            if (maxLeafDepth - minLeafDepth > 1) {
                return false;
            }
        }

        // Push the left and/or right nodes onto the stack
        if (node.left) {
            stack.push({ node: node.left, level: level + 1 });
        }

        if (node.right) {
            stack.push({ node: node.right, level: level + 1 });
        }
    }

    // Once the entire tree has been traversed, check if the deepest and
    // shallowest leaf nodes are at most 1 level apart. Return true if so, and
    // false if not.
    return maxLeafDepth - minLeafDepth <= 1;
};

export default isBinTreeSuperbalanced;
