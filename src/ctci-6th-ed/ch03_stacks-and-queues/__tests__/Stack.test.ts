import Stack from '../Stack';

describe('Stack', () => {
    it('pushes and peeks', () => {
        const myStack = new Stack();
        myStack.push('foo');
        expect(myStack.peek()).toBe('foo');
    });

    it('pops', () => {
        const myStack = new Stack();

        myStack.push('foo');
        myStack.push('bar');
        myStack.push('fizz');

        expect(myStack.pop()).toBe('fizz');
        expect(myStack.pop()).toBe('bar');
        expect(myStack.pop()).toBe('foo');
        expect(myStack.peek()).toBe(undefined);
    });

    it('returns if empty or not', () => {
        const myStack = new Stack();
        expect(myStack.isEmpty()).toBe(true);

        myStack.push('foo');
        expect(myStack.isEmpty()).toBe(false);
    });
});
