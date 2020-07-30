/**
 * 3.1 - Three in One
 *
 * Describe how you could use a single array to implement three stacks.
 */

interface CursorMap {
    [index: string]: number;
}

// Find the largest index in the cursor map
const getCursorMax = (cursors: CursorMap): number => {
    const cursorKeys = Object.keys(cursors);
    return cursorKeys.reduce((accum, cursorKey) => {
        const cursor = cursors[cursorKey];
        return Math.max(accum, cursor);
    }, 0);
};

// Get a a cursor for the stack. If it doesn't exist, insert it first
const getCursor = (stackName: string, cursors: CursorMap): number => {
    if (cursors[stackName]) {
        return cursors[stackName];
    }
    const cursorMax = getCursorMax(cursors);
    cursors[stackName] = cursorMax;
    return cursorMax;
};

// Increment cursors above the cursor
const incrCursorsAbove = (cursors: CursorMap, cursor: number): void => {
    Object.keys(cursors).forEach((cursorKey) => {
        if (cursors[cursorKey] > cursor) {
            ++cursors[cursorKey];
        }
    });
};

export default class multiStack {
    // Indexes of the topmost elements in each stack
    cursors: CursorMap = {};

    // Single array contains all elements of all stacks
    stack: number[] = [];

    push(stackName: string, item: any): void {
        // Get the current cursor
        let cursor = getCursor(stackName, this.cursors);

        // Update any cursors above the current one
        incrCursorsAbove(this.cursors, cursor);

        // If the stack is not empty, also increment this cursor
        if (!this.isEmpty(stackName)) {
            cursor = ++this.cursors[stackName];
        }

        // Insert item non-destructively
        this.stack.splice(cursor, 0, item);
    }

    pop(): any {
        return null;
    }

    peek(stackName: string): any {
        const cursor = getCursor(stackName, this.cursors);
        console.log('>>>', this.stack, cursor);
        return this.stack[cursor];
    }

    // Return if the specified stack is empty or not
    isEmpty(stackName: string): boolean {
        const cursor = getCursor(stackName, this.cursors);
        return this.stack[cursor] === undefined;
    }
}
