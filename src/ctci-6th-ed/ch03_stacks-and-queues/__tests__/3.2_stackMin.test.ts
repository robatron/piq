import { StackMin } from '../3.2_stackMin';

describe('StackMin', () => {
    describe('constructor', () => {
        it('creates an empty stack', () => {
            const stack = new StackMin<number>();
            expect(stack.length).toBe(0);
            expect(stack.peek()).toBeNull();

            const stack2 = new StackMin<string>();
            expect(stack2.length).toBe(0);
            expect(stack2.peek()).toBeNull();
        });

        it('creates a stack initialized with a value', () => {
            const stack = new StackMin<number>(42);
            expect(stack.length).toBe(1);
            expect(stack.peek()).toBe(42);

            const stack2 = new StackMin<string>('foo');
            expect(stack2.length).toBe(1);
            expect(stack2.peek()).toBe('foo');
        });

        it('creates a stack initialized with null', () => {
            const stack = new StackMin<number>(null);
            expect(stack.length).toBe(1);
            expect(stack.peek()).toBeNull();

            const stack2 = new StackMin<string>(null);
            expect(stack2.length).toBe(1);
            expect(stack2.peek()).toBeNull();
        });
    });

    describe('push', () => {
        it('pushes items onto the stack', () => {
            const stack = new StackMin<number>();

            expect(stack.length).toBe(0);

            stack.push(42);

            expect(stack.length).toBe(1);

            stack.push(84);

            expect(stack.length).toBe(2);
            expect(stack.peek()).toBe(84);

            stack.push(168);

            expect(stack.length).toBe(3);
            expect(stack.peek()).toBe(168);
        });
    });

    describe('peek', () => {
        it('returns the top item without removing it', () => {
            const stack = new StackMin<number>();

            stack.push(11);
            stack.push(22);
            stack.push(33);

            expect(stack.length).toBe(3);
            expect(stack.peek()).toBe(33);
            expect(stack.length).toBe(3);
        });

        it('returns null if there are no items to peek', () => {
            const stack = new StackMin<number>();

            expect(stack.length).toBe(0);
            expect(stack.peek()).toBeNull();
            expect(stack.length).toBe(0);
        });
    });

    describe('pop', () => {
        it('returns and removes the top item', () => {
            const stack = new StackMin<number>();

            stack.push(11);
            stack.push(22);
            stack.push(33);

            expect(stack.length).toBe(3);
            expect(stack.pop()).toBe(33);
            expect(stack.length).toBe(2);
        });

        it('returns null if there are no items to remove', () => {
            const stack = new StackMin<number>();

            expect(stack.length).toBe(0);
            expect(stack.pop()).toBeNull();
            expect(stack.length).toBe(0);
        });
    });

    describe('min', () => {
        it('returns null if there are no items on the stack', () => {
            const stack = new StackMin<number>();

            expect(stack.length).toBe(0);
            expect(stack.min()).toBeNull();
            expect(stack.length).toBe(0);
        });

        it('returns the smallest value in the stack without removing it', () => {
            const stack = new StackMin<number>();

            stack.push(22);
            stack.push(11);
            stack.push(33);

            expect(stack.length).toBe(3);
            expect(stack.min()).toBe(11);
            expect(stack.length).toBe(3);
        });

        it('returns the next smallest value after the first smallest is popped', () => {
            const stack = new StackMin<number>();

            stack.push(5);
            expect(stack.min()).toBe(5);

            stack.push(6);
            expect(stack.min()).toBe(5);

            stack.push(3);
            expect(stack.min()).toBe(3);

            stack.push(7);
            expect(stack.min()).toBe(3);

            expect(stack.pop()).toBe(7);
            expect(stack.min()).toBe(3);

            // Minimum value reverts to previous smallest value, 5
            expect(stack.pop()).toBe(3);
            expect(stack.min()).toBe(5);
        });

        it('handles duplicate minimum values', () => {
            const stack = new StackMin<number>();

            // [5, 6, 3, 3, 7, 7]

            stack.push(10);
            expect(stack.min()).toBe(10);

            stack.push(5);
            expect(stack.min()).toBe(5);

            stack.push(6);
            expect(stack.min()).toBe(5);

            stack.push(3);
            expect(stack.min()).toBe(3);

            stack.push(3);
            expect(stack.min()).toBe(3);

            stack.push(7);
            expect(stack.min()).toBe(3);

            stack.push(7);
            expect(stack.min()).toBe(3);

            expect(stack.pop()).toBe(7);
            expect(stack.pop()).toBe(7);
            expect(stack.min()).toBe(3);

            expect(stack.pop()).toBe(3);
            expect(stack.pop()).toBe(3);
            expect(stack.min()).toBe(5);

            expect(stack.pop()).toBe(6);
            expect(stack.min()).toBe(5);

            expect(stack.pop()).toBe(5);
            expect(stack.min()).toBe(10);

            expect(stack.pop()).toBe(10);
            expect(stack.min()).toBe(null);

            expect(stack.pop()).toBe(null);
            expect(stack.min()).toBe(null);
        });
    });
});
