/**
 * Practice implementation of a stack
 */

export default class Stack {
    // The stack data structure
    s: Array<number | string> = [];

    // Push an item onto the stack
    push(item: number | string): void {
        this.s[this.s.length] = item;
    }

    // Pop an item off the stack
    pop(): number | string {
        const targetIndex: number = this.s.length - 1;
        const item: number | string = this.s[targetIndex];
        this.s.splice(targetIndex, 1);
        return item;
    }

    peek(): number | string {
        return this.s[this.s.length - 1];
    }

    isEmpty(): boolean {
        return !this.s.length;
    }
}
