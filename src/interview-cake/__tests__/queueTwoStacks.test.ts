import { QueueTwoStacks } from '../queueTwoStacks';

/*
const q = new QueueTwoStacks();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

let desc = 'dequeue #1';
let actual = q.dequeue();
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'dequeue #2';
actual = q.dequeue();
expected = 2;
assertEquals(actual, expected, desc);

q.enqueue(4);

desc = 'dequeue #3';
actual = q.dequeue();
expected = 3;
assertEquals(actual, expected, desc);

desc = 'dequeue #4';
actual = q.dequeue();
expected = 4;
assertEquals(actual, expected, desc);

desc = 'dequeue from empty queue';
const emptyDequeue = () => q.dequeue();
assertThrowsError(emptyDequeue, desc);
*/

describe('queueTwoStacks', () => {
    it('handles a combination of enqueueing and dequeueing', () => {
        const q = new QueueTwoStacks<number>()
            .enqueue(0)
            .enqueue(1)
            .enqueue(2)
            .enqueue(3)
            .enqueue(4)
            .enqueue(5);

        expect(q.dequeue()).toBe(0);
        expect(q.dequeue()).toBe(1);
        expect(q.dequeue()).toBe(2);

        q.enqueue(6).enqueue(7);

        expect(q.dequeue()).toBe(3);
        expect(q.dequeue()).toBe(4);

        q.enqueue(8);

        expect(q.dequeue()).toBe(5);

        q.enqueue(9);

        expect(q.dequeue()).toBe(6);
        expect(q.dequeue()).toBe(7);
        expect(q.dequeue()).toBe(8);
        expect(q.dequeue()).toBe(9);

        expect(q.dequeue()).toBeNull();
    });
});
