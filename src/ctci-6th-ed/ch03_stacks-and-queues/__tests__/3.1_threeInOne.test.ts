import multiStack from '../3.1_threeInOne';

describe('multiStack', () => {
    it('pushes and peeks', () => {
        const ms = new multiStack();

        ms.push('myStack', 'foo');

        expect(ms.peek('myStack')).toBe('foo');

        ms.push('myStack', 'bar');
        ms.push('myStack', 'fizz');
        ms.push('myStack', 'buzz');

        expect(ms.peek('myStack')).toBe('buzz');
    });
});
