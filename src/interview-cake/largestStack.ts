/*
You want to be able to access the largest element in a stack.

You've already implemented a Stack class (see below).

Use your Stack class to implement a new class MaxStack with a method getMax()
that returns the largest element in the stack. getMax() should not remove the
item.

Your stacks will contain only integers.
*/
export class Stack<T> {
    items: T[] = [];

    // Push a new item onto the stack
    push(item: T): void {
        this.items.push(item);
    }

    // Remove and return the last item
    pop(): T {
        return this.items.length ? this.items.pop() : null;
    }

    // Return the last item without removing it
    peek(): T {
        return this.items.length ? this.items[this.items.length - 1] : null;
    }
}

export class MaxStack<T> extends Stack<T> {
    maxItems: Stack<T> = new Stack<T>();

    push(item: T): this {
        this.items.push(item);

        // Add this item as the max item if larger than current last item
        const curMaxItem = this.maxItems.peek();
        if (curMaxItem === null || item >= curMaxItem) {
            this.maxItems.push(item);
        }

        return this;
    }

    pop(): T {
        if (this.items.length) {
            const curItem = this.items.pop();

            if (curItem === this.maxItems.peek()) {
                this.maxItems.pop();
            }

            return curItem;
        }
        return null;
    }

    // Return the largest item in the stack without removing it
    peekMax(): T {
        return this.maxItems.peek();
    }
}
