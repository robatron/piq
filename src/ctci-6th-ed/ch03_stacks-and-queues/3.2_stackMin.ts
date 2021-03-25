/**
 * 3.2 - Stack Min
 *
 * How would you design a stack which, in addition to push and pop, has a
 * function `min` which returns the minimum element? Push, pop and min should
 * all operate in 0(1) time.
 */

class StackMinNode<Type> {
    public value: Type;
    public next: StackMinNode<Type>;

    constructor(val: Type, next: StackMinNode<Type> = null) {
        this.value = val;
        this.next = next;
    }
}

export class StackMin<Type> {
    // Length of this stack
    private _length = 0;

    // Head node of the stack
    private _headNode: StackMinNode<Type> = null;

    // Head node of the stack of minimum values (smallest on top)
    private _minHeadNode: StackMinNode<Type> = null;

    constructor(initVal: Type = undefined) {
        if (typeof initVal !== 'undefined') {
            this._headNode = new StackMinNode<Type>(initVal);
            this._minHeadNode = new StackMinNode<Type>(initVal);
            this._length++;
        }
    }

    get length(): number {
        return this._length;
    }

    push(val: Type): void {
        const next = this._headNode;
        this._headNode = new StackMinNode<Type>(val, next);
        this._length++;

        if (!this._minHeadNode || val <= this._minHeadNode.value) {
            const minNext = this._minHeadNode;
            this._minHeadNode = new StackMinNode<Type>(val, minNext);
        }
    }

    peek(): Type {
        return this._headNode?.value || null;
    }

    pop(): Type {
        if (!this._headNode) {
            return null;
        }

        const headVal = this._headNode.value;
        this._headNode = this._headNode.next;
        this._length--;

        if (headVal === this._minHeadNode.value) {
            this._minHeadNode = this._minHeadNode.next;
        }

        return headVal;
    }

    // Return the smallest value in the stack
    min(): Type {
        return this._minHeadNode?.value || null;
    }
}
