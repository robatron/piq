import SetOfStacks from '../3.3_stackOfPlates';

describe('SetOfStacks', () => {
    describe('single-stack basic behavior', () => {
        it('pushes, peeks, and pops', () => {
            const stacks = new SetOfStacks<string>();
            const items = 'abc'.split('');

            expect(stacks.length).toBe(0);
            expect(stacks.pop()).toBeUndefined();

            items.forEach((item, idx) => {
                stacks.push(item);
                expect(stacks.length).toBe(idx + 1);
                expect(stacks.peek()).toBe(item);
                expect(stacks.length).toBe(idx + 1);
            });

            items.reverse().forEach((item, idx) => {
                const negIdx = items.length - 1 - idx;
                expect(stacks.length).toBe(negIdx + 1);
                expect(stacks.pop()).toBe(item);
                expect(stacks.length).toBe(negIdx);
            });

            expect(stacks.length).toBe(0);
            expect(stacks.pop()).toBeUndefined();
        });

        it('Can push on instantiation', () => {
            const stacks = new SetOfStacks<string>('foo');
            expect(stacks.length).toBe(1);
            expect(stacks.peek()).toBe('foo');
        });

        it('supports null values', () => {
            const stacks = new SetOfStacks<string>(null);
            expect(stacks.length).toBe(1);
            expect(stacks.peek()).toBe(null);
            expect(stacks.pop()).toBe(null);
            expect(stacks.length).toBe(0);
            expect(stacks.peek()).toBeUndefined();
            expect(stacks.pop()).toBeUndefined();
            expect(stacks.length).toBe(0);
        });
    });

    describe('multi-stack basic behavior', () => {
        it('pushes, peeks, and pops', () => {
            const maxStackHeight = 5;
            const stacks = new SetOfStacks<string>(undefined, maxStackHeight);
            const items = 'I2FPyWjqa4k8GX25XSzzQ'.split('');

            // Initially, there should be no items, and no stacks. Pop and peek
            // should be undefined.
            expect(stacks.length).toBe(0);
            expect(stacks.stacksCount).toBe(0);
            expect(stacks.peek()).toBeUndefined();
            expect(stacks.pop()).toBeUndefined();

            // Verify the lengths after pushing each item
            items.forEach((item, idx) => {
                stacks.push(item);
                expect(stacks.length).toBe(idx + 1);
                expect(stacks.stacksCount).toBe(
                    Math.ceil((idx + 1) / maxStackHeight),
                );
            });

            // Verify the lengths after pushing all items, and the top item
            expect(stacks.length).toBe(items.length);
            expect(stacks.stacksCount).toBe(
                Math.ceil(items.length / maxStackHeight),
            );
            expect(stacks.peek()).toBe(items[items.length - 1]);

            // Verify the lengths after peeking and popping all items
            items.forEach((item, idx) => {
                const negIdx = items.length - 1 - idx;
                expect(stacks.peek()).toBe(items[negIdx]);
                expect(stacks.pop()).toBe(items[negIdx]);
                expect(stacks.length).toBe(negIdx);
                expect(stacks.stacksCount).toBe(
                    Math.ceil(negIdx / maxStackHeight),
                );
            });

            // After popping all items, there should be no items left, and the
            // lengths should both be zero
            expect(stacks.length).toBe(0);
            expect(stacks.stacksCount).toBe(0);
            expect(stacks.peek()).toBeUndefined();
            expect(stacks.pop()).toBeUndefined();
        });
    });

    describe('execOnSubstack', () => {
        it('peeks at a specific substack', () => {
            const maxStackHeight = 3;
            const stacks = new SetOfStacks<string>(undefined, maxStackHeight);
            const items = (
                'e70' + // Stack 0
                'kIr' + // Stack 1
                'Guo' + // Stack 2
                'rsG' + // Stack 3
                ''
            ).split('');

            // Attempting to peek the empty stack should yeild undefined
            expect(stacks.peekAt(0)).toBeUndefined();

            // Push the test items onto the stack
            items.forEach((item) => {
                stacks.push(item);
            });

            // We should have 12 items on 4 stacks
            expect(stacks.length).toBe(12);
            expect(stacks.stacksCount).toBe(4);

            // Peeking at stack 3 (the top substack) should be identical to
            // peeking at the set of stacks
            expect(stacks.peekAt(3)).toBe('G');
            expect(stacks.peekAt(3)).toBe(stacks.peek());

            // We should be able to peek every substack
            expect(stacks.peekAt(2)).toBe('o');
            expect(stacks.peekAt(1)).toBe('r');
            expect(stacks.peekAt(0)).toBe('0');

            // Peeking at non-existent substacks should yield undefined
            expect(stacks.peekAt(-1)).toBeUndefined();
            expect(stacks.peekAt(items.length / 3 + 100)).toBeUndefined();

            // All of this peeking activity should not have modified the stack
            expect(stacks.length).toBe(12);
            expect(stacks.stacksCount).toBe(4);
            items.reverse().forEach((item) => {
                expect(stacks.pop()).toBe(item);
            });
        });

        it('pops at a specific substack', () => {
            const maxStackHeight = 3;
            const stacks = new SetOfStacks<string>(undefined, maxStackHeight);
            const items = (
                'e70' + // Stack 0
                'kIr' + // Stack 1
                'Guo' + // Stack 2
                'rsG' + // Stack 3
                ''
            ).split('');

            // Attempting to pop the empty stack should yield undefined
            expect(stacks.popAt(0)).toBeUndefined();

            // Push the test items onto the stack
            items.forEach((item) => {
                stacks.push(item);
            });

            // Gut check: we should have 12 items on 4 stacks
            expect(stacks.length).toBe(12);
            expect(stacks.stacksCount).toBe(4);

            // Popping at non-existent substacks should yield undefined
            expect(stacks.popAt(-1)).toBeUndefined();
            expect(stacks.popAt(items.length / 3 + 100)).toBeUndefined();

            // Popping at stack 3 (the top substack) should be identical to
            // peeking at the set of stacks
            expect(stacks.peek()).toBe('G');
            expect(stacks.popAt(3)).toBe('G');

            // We should be able to pop every substack
            expect(stacks.popAt(2)).toBe('o');
            expect(stacks.popAt(1)).toBe('r');
            expect(stacks.popAt(0)).toBe('0');

            // We've popped 4 times, so we should have 4 fewer items, but the
            // number of stacks should be the same
            expect(stacks.length).toBe(8);
            expect(stacks.stacksCount).toBe(4);

            // If we pop all items off of stack 1, the number of stacks should
            // get decremented
            expect(stacks.popAt(1)).toBe('I');
            expect(stacks.popAt(1)).toBe('k');
            expect(stacks.length).toBe(6);
            expect(stacks.stacksCount).toBe(3);

            // Verify we can pop the remaining items as expected
            expect(stacks.pop()).toBe('s');
            expect(stacks.pop()).toBe('r');
            expect(stacks.pop()).toBe('u');
            expect(stacks.pop()).toBe('G');
            expect(stacks.pop()).toBe('7');
            expect(stacks.pop()).toBe('e');

            expect(stacks.length).toBe(0);
            expect(stacks.stacksCount).toBe(0);

            expect(stacks.pop()).toBeUndefined();
            expect(stacks.stacksCount).toBe(0);
        });
    });
});
