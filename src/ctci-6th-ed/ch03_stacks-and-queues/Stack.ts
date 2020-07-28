/**
 * Practice implementation of a stack
 */

export default class Stack {
    // The stack data structure
    s: any[] = [];

    // Push an item onto the stack
    push(item: any): void {
        this.s[this.s.length] = item;
    }

    // Pop an item off the stack
    pop(): any {
        const targetIndex: number = this.s.length - 1;
        const item: any = this.s[targetIndex];
        this.s.splice(targetIndex, 1);
        return item;
    }

    peek(): any {
        return this.s[this.s.length - 1];
    }

    isEmpty(): boolean {
        return !Boolean(this.s.length);
    }
}
