/* A single node in a stack */
class StackNode<T> {
    value: T;
    prevNode: StackNode<T>;

    constructor(initVal: T, prev: StackNode<T> = null) {
        this.value = initVal;
        this.prevNode = prev;
    }
}

/* A simple stack implementation using linked lists */
export default class Stack<T> {
    private headNode: StackNode<T> = null;
    private _length = 0;

    constructor(initVal: T = undefined) {
        if (initVal !== undefined) {
            this.push(initVal);
        }
    }

    get length(): number {
        return this._length;
    }

    push(val: T): void {
        this.headNode = new StackNode<T>(val, this.headNode);
        this._length++;
    }

    pop(): T {
        if (!this.headNode) {
            return undefined;
        }

        const headVal = this.headNode.value;
        this.headNode = this.headNode.prevNode;
        this._length--;

        return headVal;
    }

    peek(): T {
        return this.headNode?.value;
    }
}

/* Simple implementation of a stack using an array */
export class StackNaive<T> {
    // The stack data structure
    s: Array<T> = [];

    // Push an item onto the stack
    push(item: T): void {
        this.s[this.s.length] = item;
    }

    // Pop an item off the stack
    pop(): T {
        const targetIndex: number = this.s.length - 1;
        const item: T = this.s[targetIndex];
        this.s.splice(targetIndex, 1);
        return item;
    }

    peek(): T {
        return this.s[this.s.length - 1];
    }

    isEmpty(): boolean {
        return !this.s.length;
    }
}
