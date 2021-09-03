import Stack from './lib/Stack';

/*
Implement a queue with 2 stacks. Your queue should have an enqueue and a
dequeue method and it should be "first in first out" (FIFO).

Optimize for the time cost of m calls on your queue. These can be any mix of
enqueue and dequeue calls.

Assume you already have a stack implementation and it gives O(1)O(1) time push
and pop.
*/
export class QueueTwoStacks<T> {
    // Newest items on top
    newestItems = new Stack<T>();

    // Oldest items on top
    oldestItems = new Stack<T>();

    // Enqueue the newest item by simply pushing onto our "new" stack so the
    // newest item is always at the top. Return `this` for chaining.
    enqueue(item: T): this {
        this.newestItems.push(item);
        return this;
    }

    // Dequeue the oldest item by flipping all of the newest items onto the
    // "old" stack so the oldest item is at the top and return it.
    dequeue(): T {
        // We only need to flush the newest stack to the oldest stack if we're
        // out of oldest items to return
        if (!this.oldestItems.size()) {
            let newestItem = this.newestItems.pop();

            while (newestItem !== null) {
                this.oldestItems.push(newestItem);
                newestItem = this.newestItems.pop();
            }
        }

        return this.oldestItems.pop();
    }
}
