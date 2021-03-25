import multiStack from '../3.1_threeInOne';

describe('multiStack', () => {
    describe('push', () => {
        it('pushes and peeks', () => {
            const ms = new multiStack();

            ms.push('myStack', 'foo');

            expect(ms.peek('myStack')).toBe('foo');

            ms.push('myStack', 'bar');
            ms.push('myStack', 'fizz');
            ms.push('myStack', 'buzz');

            expect(ms.peek('myStack')).toBe('buzz');
        });

        it('supports multiple stacks', () => {
            const ms = new multiStack();

            Array.from(Array(10).keys()).forEach((stackNumber) => {
                Array.from(Array(10).keys()).forEach((itemNumber) => {
                    ms.push('stack-' + stackNumber, 'item-' + itemNumber);
                    expect(ms.peek('stack-' + stackNumber)).toBe(
                        'item-' + itemNumber,
                    );
                });
            });
        });
    });

    describe('pop', () => {
        it('Returns and removes the top element of the specified stack', () => {
            const ms = new multiStack();

            ms.push('stack', 'foo');
            ms.push('stack', 'bar');
            ms.push('stack', 'fizz');
            ms.push('stack', 'buzz');

            expect(ms.pop('stack')).toBe('buzz');
            expect(ms.pop('stack')).toBe('fizz');
            expect(ms.pop('stack')).toBe('bar');
            expect(ms.pop('stack')).toBe('foo');

            expect(ms.peek('stack')).toBe(undefined);
        });

        it('supports multiple stacks', () => {
            const ms = new multiStack();

            Array.from(Array(10).keys()).forEach((stackNumber) => {
                Array.from(Array(10).keys()).forEach((itemNumber) => {
                    ms.push('stack-' + stackNumber, `item-${itemNumber}-a`);
                    ms.push('stack-' + stackNumber, `item-${itemNumber}-b`);
                    ms.push('stack-' + stackNumber, `item-${itemNumber}-c`);

                    expect(ms.pop('stack-' + stackNumber)).toBe(
                        `item-${itemNumber}-c`,
                    );
                    expect(ms.pop('stack-' + stackNumber)).toBe(
                        `item-${itemNumber}-b`,
                    );
                    expect(ms.pop('stack-' + stackNumber)).toBe(
                        `item-${itemNumber}-a`,
                    );
                    expect(ms.pop('stack-' + stackNumber)).toBe(undefined);
                });
            });
        });
    });
});
