/**
 * 3.1 - Three in One
 *
 * Describe how you could use a single array to implement three stacks.
 *
 * Modification: Store `n` stacks in a single, dynamically-resizing array.
 */

enum Direction {
    up,
    down,
}

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

// Increment or decrement cursors above the cursor
const crementCursorsAbove = (
    direction: Direction,
    cursors: CursorMap,
    cursor: number,
): void => {
    Object.keys(cursors).forEach((cursorKey) => {
        if (cursors[cursorKey] > cursor) {
            if (direction === Direction.up) {
                ++cursors[cursorKey];
            } else if ((direction = Direction.down)) {
                --cursors[cursorKey];
            }
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
        crementCursorsAbove(Direction.up, this.cursors, cursor);

        // If the stack is not empty, also increment this cursor
        if (!this.isEmpty(stackName)) {
            cursor = ++this.cursors[stackName];
        }

        // Insert item non-destructively
        this.stack.splice(cursor, 0, item);
    }

    pop(stackName: string): any {
        // Return immediately if stack is empty
        // if (this.isEmpty(stackName)) {
        //     return;
        // }

        // Get the current cursor and the item
        const cursor = getCursor(stackName, this.cursors);
        const item = this.stack[cursor];

        // Update any cursors above the current one
        crementCursorsAbove(Direction.down, this.cursors, cursor);

        // If the stack is empty, remove its cursor. Otherwise, just decrement.
        if (this.isEmpty(stackName)) {
            delete this.cursors[stackName];
        } else {
            --this.cursors[stackName];
        }

        // Remove the item destructively
        this.stack.splice(cursor, 1);

        // Return the item captured earlier
        return item;
    }

    peek(stackName: string): any {
        const cursor = getCursor(stackName, this.cursors);
        return this.stack[cursor];
    }

    // Return if the specified stack is empty or not
    isEmpty(stackName: string): boolean {
        const cursor = getCursor(stackName, this.cursors);
        return this.stack[cursor] === undefined;
    }
}
