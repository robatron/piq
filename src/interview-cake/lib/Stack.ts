// Simple Stack class
export default class Stack<T> {
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

    // Return the size of this stack
    size(): number {
        return this.items.length;
    }
}
