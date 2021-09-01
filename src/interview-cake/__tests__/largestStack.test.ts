import { MaxStack } from '../largestStack';

/*
const s = new MaxStack();
s.push(5);

assertEquals(5, s.getMax(), 'check max after 1st push');

s.push(4);
s.push(7);
s.push(7);
s.push(8);

assertEquals(8, s.getMax(), 'check before 1st pop');
assertEquals(8, s.pop(), 'check pop #1');

assertEquals(7, s.getMax(), 'check max after 1st pop');
assertEquals(7, s.pop(), 'check pop #2');

assertEquals(7, s.getMax(), 'check max after 2nd pop');
assertEquals(7, s.pop(), 'check pop #3');

assertEquals(5, s.getMax(), 'check max after 3rd pop');
assertEquals(4, s.pop(), 'check pop #4');

assertEquals(5, s.getMax(), 'check max after 4th pop');

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}
*/
describe('MaxStack', () => {
    it('returns null if stack is empty', () => {
        expect(new MaxStack<number>().peekMax()).toBeNull();
    });

    it('returns the only item in a single-item list', () => {
        expect(new MaxStack<number>().push(5).peekMax()).toBe(5);
    });

    it('returns the next-largest item after a pop', () => {
        const s = new MaxStack<number>().push(2).push(3).push(1);

        expect(s.peekMax()).toBe(3);
        expect(s.pop()).toBe(1);

        expect(s.peekMax()).toBe(3);
        expect(s.pop()).toBe(3);

        expect(s.peekMax()).toBe(2);
        expect(s.pop()).toBe(2);

        expect(s.peekMax()).toBeNull();
        expect(s.pop()).toBeNull();
    });

    it('handles duplicates (sample input)', () => {
        const s = new MaxStack<number>()
            .push(5)
            .push(4)
            .push(7)
            .push(7)
            .push(8);

        expect(s.peekMax()).toBe(8);
        expect(s.pop()).toBe(8);

        expect(s.peekMax()).toBe(7);
        expect(s.pop()).toBe(7);

        expect(s.peekMax()).toBe(7);
        expect(s.pop()).toBe(7);

        expect(s.peekMax()).toBe(5);
        expect(s.pop()).toBe(4);

        expect(s.peekMax()).toBe(5);
        expect(s.pop()).toBe(5);

        expect(s.peekMax()).toBeNull();
        expect(s.pop()).toBeNull();
    });
});
