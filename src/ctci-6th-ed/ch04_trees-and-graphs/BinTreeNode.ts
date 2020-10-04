export const enum ChildType {
    left,
    right,
}

// A binary tree node which has a left and a right node, in addition to
// its parent node
export default class BinTreeNode {
    value: number | string;
    parent: BinTreeNode = null;
    childType: ChildType = null;

    private _leftChild: BinTreeNode;
    private _rightChild: BinTreeNode;

    constructor(
        value: number | string = null,
        leftChild: BinTreeNode = null,
        rightChild: BinTreeNode = null,
    ) {
        this.value = value;
        this.setLeftChild(leftChild);
        this.setRightChild(rightChild);
    }

    isChildless(): boolean {
        return !this._leftChild && !this._rightChild;
    }

    // Renouce parents, become a man/woman
    emancipate(): void {
        this.parent = null;
        this.childType = null;
    }

    // Left child node accessors
    getLeftChild(): BinTreeNode {
        return this._leftChild;
    }

    setLeftChild(newNode: BinTreeNode): void {
        this._leftChild = newNode;
        if (newNode) {
            this._leftChild.parent = this;
            this._leftChild.childType = ChildType.left;
        }
    }

    // Right child node accessors
    getRightChild(): BinTreeNode {
        return this._rightChild;
    }

    setRightChild(newNode: BinTreeNode): void {
        this._rightChild = newNode;
        if (newNode) {
            this._rightChild.parent = this;
            this._rightChild.childType = ChildType.right;
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
