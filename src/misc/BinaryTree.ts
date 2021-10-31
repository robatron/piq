/**
 * Binary tree practice!
 *
 * Binary trees can be represented in two popular ways:
 *
 * 1. Dynamic node representation (linked representation)
 * 2. Array representation (sequential representation)
 *
 * The following classes demonstrate how binary trees can be created and
 * represented in both ways.
 *
 * References:
 *
 * - https://www.geeksforgeeks.org/binary-tree-set-1-introduction/
 * - https://www.geeksforgeeks.org/binary-tree-array-implementation/
 *
 * Notes:
 *
 * - Sequential representation:
 *
 *                 0
 *          1              2
 *       3     4       5       6
 *      7 8   9 10   11 12   13 14
 *
 * - Parent -> left child: 2 * p + 1, right child: 2 * p + 2
 */

// Binary tree sequence array type and predicate
type BinTreeSeqArr = unknown[];
const isBinTreeSeqArr = (input: BinTreeSeqArr): input is BinTreeSeqArr => {
    return Array.isArray(input as BinTreeSeqArr);
};

// Single binary tree node. Basis of linked representations.
class BinTreeNode<T = unknown> {
    val: T;
    left: BinTreeNode<T>;
    right: BinTreeNode<T>;

    constructor(
        val: T = null,
        left: BinTreeNode<T> = null,
        right: BinTreeNode<T> = null,
    ) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Binary tree. Supports both linked and sequential representation.
// TODO: Don't use `shift` to implement a queue (inefficient)
class BinaryTree {
    // Store tree internally in linked representation and track its size (number of nodes)
    root: BinTreeNode<unknown>;
    size: number;

    // Support constructing tree in either linked or sequential representation
    constructor(root?: BinTreeNode<unknown>);
    constructor(root?: BinTreeSeqArr);
    constructor(root: BinTreeNode<unknown> | BinTreeSeqArr = null) {
        // Empty tree
        if (root === null) {
            this.root = null;
            this.size = 0;
        }

        // Tree in linked representation
        else if (root instanceof BinTreeNode) {
            this.setTreeLinked(root);
        }

        // Tree in sequential representation
        else if (isBinTreeSeqArr(root)) {
            this.setTreeSeq(root);
        }
    }

    // Linked representation ===================================================

    // Return the tree directly in linked representation
    getTreeLinked = (): BinTreeNode<unknown> => this.root;

    // Set the tree directly using linked representation. Traverse the tree
    // breadth-first to calculate its size.
    setTreeLinked = (root: BinTreeNode<unknown>): void => {
        this.root = root;
        this.size = 0;

        const nodeQueue: BinTreeNode[] = [root];
        while (nodeQueue.length) {
            const curNode = nodeQueue.shift();
            this.size++;

            ['left', 'right'].forEach((dir) => {
                const curChild = curNode[dir];
                if (curChild !== null) {
                    nodeQueue.push(curNode[dir]);
                }
            });
        }
    };

    // Sequence representation =================================================

    // Return the tree in sequential representation by traversing the tree
    // breadth-first and tracking the node values
    getTreeSeq = (): BinTreeSeqArr => {
        const seqArr: BinTreeSeqArr = [];
        const nodeQueue: BinTreeNode[] = [this.root];

        while (nodeQueue.length) {
            const curNode: BinTreeNode = nodeQueue.shift();

            // Push this node's children onto the traversal queue if they exist
            // or if they don't exist and should
            ['left', 'right'].forEach((dir, j) => {
                const child = curNode[dir];
                const childIdx = 2 * seqArr.length + j + 1;
                const shouldChildExist: boolean = childIdx < this.size;
                const doesChildExist = child !== null;

                // Push the child onto the traversal queue if it exists
                if (doesChildExist) {
                    nodeQueue.push(child);
                }

                // Otherwise the child should exist but doesn't, so push an
                // empty placeholder node instead
                else if (shouldChildExist) {
                    nodeQueue.push(new BinTreeNode(null));
                }
            });

            // Push this node's value onto the sequential array
            seqArr.push(curNode.val);
        }

        return seqArr;
    };

    // Set the tree using sequential representation by building up the tree
    // breadth-first and filling in each node's value
    setTreeSeq = (treeArr: BinTreeSeqArr): void => {
        this.root = new BinTreeNode();
        const nodeQueue: BinTreeNode[] = [this.root];

        for (let i = 0; i < treeArr.length; i++) {
            const curNode: BinTreeNode = nodeQueue.shift();

            if (curNode !== null) {
                const curVal = treeArr[i];
                curNode.val = curVal;

                // Push an empty node onto the traversal queue for each of the
                // node's existing children
                ['left', 'right'].forEach((dir, j) => {
                    const childIdx = 2 * i + j + 1;
                    const childOutOfBounds = childIdx >= treeArr.length;

                    if (childOutOfBounds || treeArr[childIdx] === null) {
                        curNode[dir] = null;
                    } else {
                        curNode[dir] = new BinTreeNode();
                    }

                    nodeQueue.push(curNode[dir]);
                });
            }
        }
    };

    // Traversals ==============================================================

    // Return a "level order" breadth-first traversal
    getTraversalLevelOrder = (): BinTreeSeqArr => this.getTreeSeq();

    // Return an "in-order" depth-first traversal
    getTraversalInOrder = (root: BinTreeNode = this.root): BinTreeSeqArr =>
        root
            ? [
                  ...this.getTraversalInOrder(root.left),
                  root.val,
                  ...this.getTraversalInOrder(root.right),
              ]
            : [];

    // Return an "pre-order" depth-first traversal
    getTraversalPreOrder = (root: BinTreeNode = this.root): BinTreeSeqArr =>
        root
            ? [
                  root.val,
                  ...this.getTraversalPreOrder(root.left),
                  ...this.getTraversalPreOrder(root.right),
              ]
            : [];

    // Return an "post-order" depth-first traversal
    getTraversalPostOrder = (root: BinTreeNode = this.root): BinTreeSeqArr =>
        root
            ? [
                  ...this.getTraversalPostOrder(root.left),
                  ...this.getTraversalPostOrder(root.right),
                  root.val,
              ]
            : [];
}

export default BinaryTree;
export { BinTreeNode, BinTreeSeqArr };
