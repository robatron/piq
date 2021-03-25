/**
 * 3.3 - Stack of Plates
 *
 * Imagine a (literal) stack of plates. If the stack gets too high, it might
 * topple. Therefore, in real life, we would likely start a new stack when the
 * previous stack exceeds some threshold.
 *
 * Implement a data structure SetOfStacks that mimics this. SetOfStacks should
 * be composed of several stacks and should create a new stack once the
 * previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop()
 * should behave identically to a single stack (that is, pop() should return
 * the same values as it would if there were just a single stack).
 *
 * FOLLOW UP Implement a function popAt(int index) which performs a pop
 * operation on a specific sub-stack.
 */
import Stack from './Stack';

export default class SetOfStacks<T> {
    private maxStackHeight: number;
    private stacks: Stack<Stack<T>> = null;
    private _length = 0;

    constructor(initVal: T = undefined, maxStackHeight = 3) {
        this.maxStackHeight = maxStackHeight;

        if (initVal !== undefined) {
            this.push(initVal);
        }
    }

    // Count of the total number of items across all substacks
    get length(): number {
        return this._length;
    }

    // Count of the number of substacks
    get stacksCount(): number {
        return this.stacks ? this.stacks.length : 0;
    }

    // Push an item onto the top substack. Create the substack if it does not
    // exist yet.
    push(val: T): void {
        if (!this.stacks) {
            this.stacks = new Stack<Stack<T>>(new Stack<T>(val));
        }

        // If the top substack length is about to exceed the max height, we
        // need to push a new substack initialized with the value
        else if (this.stacks.peek().length === this.maxStackHeight) {
            this.stacks.push(new Stack<T>(val));
        }

        // Otherwise, just push the new value onto the top substack
        else {
            this.stacks.peek().push(val);
        }

        this._length++;
    }

    // Peek an item on the top substack. If the stack or top substack are
    // empty, return undefined. Otherwise, peek the top substack.
    peek(): T {
        return this.stacks?.peek()?.peek();
    }

    // Peek a specific substack, not necessarily the top substack as with peek()
    peekAt(substackIdx: number): T {
        if (
            !this.stacks ||
            substackIdx < 0 ||
            substackIdx > this.stacks.length - 1
        ) {
            return;
        }

        const historyStack = new Stack<Stack<T>>();
        const timesToPop = this.stacks.length - 1 - substackIdx;

        for (let i = 0; i < timesToPop; i++) {
            historyStack.push(this.stacks.pop());
        }

        const topOfSelectedStack = this.stacks.peek().peek();

        for (let i = 0; i < timesToPop; i++) {
            this.stacks.push(historyStack.pop());
        }

        return topOfSelectedStack;
    }

    // Pop an item off the top substack. If it's the last remaining item, also
    // remove the top substack itself.
    pop(): T {
        // If the stack or the top substack are empty, return undefined
        if (this.peek() === undefined) {
            return;
        }

        // We're about to reduce the items by 1
        this._length--;

        // Pop the top substack if there will be at least one item remaining
        // below it
        if (this.stacks.peek().length > 1) {
            return this.stacks.peek().pop();
        }

        // Otherwise, we'll be popping the last item on the top substack, so pop
        // the substack itself
        return this.stacks.pop().pop();
    }

    // Pop an item off the specified substack
    popAt(substackIdx: number): T {
        if (
            !this.stacks ||
            substackIdx < 0 ||
            substackIdx > this.stacks.length - 1
        ) {
            return;
        }

        const historyStack = new Stack<Stack<T>>();
        const timesToPop = this.stacks.length - 1 - substackIdx;

        for (let i = 0; i < timesToPop; i++) {
            historyStack.push(this.stacks.pop());
        }

        const topOfSelectedStack = this.stacks.peek().pop();

        // If there's nothing left on the selected stack, remove it from the set
        if (!this.stacks.peek().length) {
            this.stacks.pop();
        }

        for (let i = 0; i < timesToPop; i++) {
            this.stacks.push(historyStack.pop());
        }

        this._length--;

        return topOfSelectedStack;
    }
}
