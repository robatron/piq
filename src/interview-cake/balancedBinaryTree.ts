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

export class BinTreeNode<T> {
    value: T;
    left: BinTreeNode<T>;
    right: BinTreeNode<T>;
    level = 0;

    constructor(value: T, left?: BinTreeNode<T>, right?: BinTreeNode<T>) {
        this.value = value;
        this.addLeft(left);
        this.addRight(right);
    }

    addLeft(left?: BinTreeNode<T>): BinTreeNode<T> {
        if (left) {
            this.left = left;
            this.left.level = this.level + 1;
            return this.left;
        }
    }

    addRight(right?: BinTreeNode<T>): BinTreeNode<T> {
        if (right) {
            this.right = right;
            this.right.level = this.level + 1;
            return this.right;
        }
    }
}

export const cn = <T>(
    v?: T,
    l?: BinTreeNode<T>,
    r?: BinTreeNode<T>,
): BinTreeNode<T> => new BinTreeNode<T>(v, l, r);

// Traverse the tree with DFS, track the depth of the deepest and shallowest
// leaf nodes, diff them, and return if it's <= 1
export default <T>(root: BinTreeNode<T>): boolean => {
    let shallowestLeafDepth = 0;
    let deepestLeafDepth = 0;
    const stack: BinTreeNode<T>[] = [root];

    while (stack.length) {
        const curNode = stack.pop();

        // Is this a leaf node?
        if (!curNode.left && !curNode.right) {
            shallowestLeafDepth = Math.min(shallowestLeafDepth, curNode.level);
            deepestLeafDepth = Math.max(deepestLeafDepth, curNode.level);

            if (deepestLeafDepth - shallowestLeafDepth > 1) {
                return false;
            }
        }

        if (curNode.left) {
            stack.push(curNode.left);
        }

        if (curNode.right) {
            stack.push(curNode.right);
        }
    }

    return deepestLeafDepth - shallowestLeafDepth <= 1;
};
