import Stack, { StackNaive } from '../Stack';

describe('Stack', () => {
    describe('primitive types', () => {
        it('pushes, pops, and peeks', () => {
            const stack = new Stack<string>();
            const items = ['a', 'b', 'c', 'd', 'e'];

            expect(stack.length).toBe(0);

            items.forEach((item, idx) => {
                stack.push(item);
                expect(stack.length).toBe(idx + 1);
            });

            items.reverse();

            items.forEach((item, idx) => {
                expect(stack.peek()).toBe(item);
                expect(stack.pop()).toBe(item);
                expect(stack.length).toBe(items.length - 1 - idx);
            });

            expect(stack.length).toBe(0);

            expect(stack.peek()).toBeUndefined();
            expect(stack.pop()).toBeUndefined();

            expect(stack.length).toBe(0);
        });

        it('can be initialized with a value', () => {
            const stack = new Stack<string>('foo');
            expect(stack.length).toBe(1);

            expect(stack.peek()).toBe('foo');
            expect(stack.pop()).toBe('foo');

            expect(stack.length).toBe(0);
            expect(stack.pop()).toBeUndefined();
            expect(stack.length).toBe(0);
        });

        it('supports `null` as a value', () => {
            const stack = new Stack<string>();
            const items = ['a', null, 'b', null, 'c'];

            expect(stack.length).toBe(0);

            items.forEach((item, idx) => {
                stack.push(item);
                expect(stack.length).toBe(idx + 1);
            });

            items.reverse();

            items.forEach((item, idx) => {
                expect(stack.peek()).toBe(item);
                expect(stack.pop()).toBe(item);
                expect(stack.length).toBe(items.length - 1 - idx);
            });

            expect(stack.length).toBe(0);

            expect(stack.peek()).toBeUndefined();
            expect(stack.pop()).toBeUndefined();

            expect(stack.length).toBe(0);
        });
    });
    describe('nested Stack type', () => {
        it('pushes, pops, and peeks', () => {
            const substackCount = 3;
            const substacks = [];
            const substackItems = 'abcdefghi'.split(''); // must be substackCount^2 length

            // Create the substacks
            for (let i = 0; i < substackCount; i++) {
                substacks[i] = new Stack<string>();
                substackItems
                    .slice(i * substackCount, i * substackCount + substackCount)
                    .forEach((item) => substacks[i].push(item));
            }

            // Create the parent stack and push the substacks onto it
            const stack = new Stack<Stack<string>>();
            for (let i = 0; i < substackCount; i++) {
                expect(stack.length).toBe(i);
                stack.push(substacks[i]);
                expect(stack.length).toBe(i + 1);
            }

            // Pop each substack and verify values
            for (let i = 0; i < substackCount; i++) {
                const negIdx = substackCount - 1 - i;
                const expectedItems = substackItems
                    .slice(
                        negIdx * substackCount,
                        negIdx * substackCount + substackCount,
                    )
                    .reverse();

                const curSubstack = stack.pop();

                expect(stack.length).toBe(negIdx);
                expect(curSubstack).toBe(substacks[negIdx]);

                expectedItems.forEach((item) => {
                    expect(curSubstack.pop()).toBe(item);
                });
            }

            const undefinedSubstack = stack.pop();
            expect(stack.length).toBe(0);

            expect(undefinedSubstack).toBeUndefined();
            expect(stack.length).toBe(0);
        });

        it('can be initialized with a stack', () => {
            const substack = new Stack<string>('foo');
            const stack = new Stack<Stack<string>>(substack);

            const poppedSubstack = stack.pop();

            expect(poppedSubstack).toBe(substack);
            expect(stack.pop()).toBeUndefined();

            expect(poppedSubstack.pop()).toBe('foo');
            expect(poppedSubstack.pop()).toBeUndefined();
        });
    });
});

describe('StackNaive', () => {
    it('pushes and peeks', () => {
        const myStack = new StackNaive<string>();
        myStack.push('foo');
        expect(myStack.peek()).toBe('foo');
    });

    it('pops', () => {
        const myStack = new StackNaive<string>();

        myStack.push('foo');
        myStack.push('bar');
        myStack.push('fizz');

        expect(myStack.pop()).toBe('fizz');
        expect(myStack.pop()).toBe('bar');
        expect(myStack.pop()).toBe('foo');

        expect(myStack.peek()).toBe(undefined);
    });

    it('returns if empty or not', () => {
        const myStack = new StackNaive<string>();
        expect(myStack.isEmpty()).toBe(true);

        myStack.push('foo');
        expect(myStack.isEmpty()).toBe(false);
    });
});
