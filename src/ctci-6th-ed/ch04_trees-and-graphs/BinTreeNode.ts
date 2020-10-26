export const enum ChildType {
    left,
    right,
}

// A binary tree node which has a left and a right node, in addition to
// its parent node
export default class BinTreeNode {
    value: number | string;

    private parent: BinTreeNode = null;
    private leftChild: BinTreeNode;
    private rightChild: BinTreeNode;

    constructor(
        value: number | string = null,
        leftChild: BinTreeNode = null,
        rightChild: BinTreeNode = null,
    ) {
        this.value = value;
        this.setLeftChild(leftChild);
        this.setRightChild(rightChild);
    }

    // Return the parent. Don't allow it to be set directly.
    getParent(): BinTreeNode {
        return this.parent;
    }

    // Dynamically return what kind of child this node is, if any
    getChildType(): ChildType {
        if (this.parent) {
            if (this.parent.getLeftChild() === this) {
                return ChildType.left;
            } else if (this.parent.getRightChild() === this) {
                return ChildType.right;
            } else {
                throw new Error(
                    'Node has parent, but parent does not have child',
                );
            }
        }
        return null;
    }

    // Get the left or right child node
    getLeftChild(): BinTreeNode {
        return this.leftChild;
    }
    getRightChild(): BinTreeNode {
        return this.rightChild;
    }

    // Return if this node has any children
    isChildless(): boolean {
        return !this.leftChild && !this.rightChild;
    }

    // Adopt a new left or right child, or abandon it by passing `null`
    setLeftChild(newNode: BinTreeNode): void {
        if (newNode) {
            newNode.parent = this;
        } else if (this.leftChild) {
            this.leftChild.parent = null;
        }
        this.leftChild = newNode;
    }
    setRightChild(newNode: BinTreeNode): void {
        if (newNode) {
            newNode.parent = this;
        } else if (this.rightChild) {
            this.rightChild.parent = null;
        }
        this.rightChild = newNode;
    }

    // Give up custody of both children if they exist
    abandonChildren(): void {
        this.setLeftChild(null);
        this.setRightChild(null);
    }

    // Renouce parent if there is one, become a man/woman
    emancipate(): void {
        if (this.parent) {
            if (this.getChildType() === ChildType.left) {
                this.parent.setLeftChild(null);
            } else if (this.getChildType() === ChildType.right) {
                this.parent.setRightChild(null);
            } else {
                throw new Error(
                    "This node has a parent, but can't determine child type",
                );
            }
        }
    }
}

/**
 * Helper function to create a new binary tree node
 */
export const cn = (
    v: number | string = null,
    l: BinTreeNode = null,
    r: BinTreeNode = null,
): BinTreeNode => new BinTreeNode(v, l, r);
