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
*/

class BinTreeNode<T> {
    value: T;
    left: BinTreeNode<T>;
    right: BinTreeNode<T>;

    constructor(value: T) {
        this.value = value;
    }

    addLeft(value: T) {
        this.left = new BinTreeNode<T>(value);
        return this.left;
    }

    addRight(value: T) {
        this.right = new BinTreeNode<T>(value);
        return this.right;
    }
}

// Traverse the tree with DFS, track the depth of the deepest and shallowest
// leaf nodes, diff them, and return if it's <= 1
export default <T>(root: BinTreeNode<T>): boolean => {
    const shallowestLeafDepth = 0;
    const deepestLeafDepth = 0;

    const stack: BinTreeNode[] = [root];

    return false;
};
