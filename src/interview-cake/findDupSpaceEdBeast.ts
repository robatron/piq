/*
Find a duplicate, Space Edition™ BEAST MODE

In Find a duplicate, Space Edition™, we were given an array of integers where:

    1. the integers are in the range 1..n
    2. the array has a length of n+1

These properties mean the array must have at least 1 duplicate. Our challenge
was to find a duplicate number without modifying the input and optimizing for
space. We used a divide and conquer approach, iteratively cutting the array in
half to find a duplicate integer in O(n lg(n)) time and O(1) space (sort of a
modified binary search).

But we can actually do better. We can find a duplicate integer in O(n) time
while keeping our space cost at O(1).

This is a tricky one to derive (unless you have a strong background in graph
theory), so we'll get you started:

Imagine each item in the array as a node in a linked list. In any linked list,
each node has a value and a "next" pointer. In this case:

    - The value is the integer from the array.
    - The "next" pointer points to the value-eth node in the list (numbered
      starting from 1). For example, if our value was 3, the "next" node would
      be the third node.

Here’s a full example:

<see diagram in link>

Notice we're using "positions" and not "indices." For this problem, we'll use
the word "position" to mean something like "index," but different: indices start
at 0, while positions start at 1. More rigorously: position = index + 1.

Using this, find a duplicate integer in O(n) time while keeping our space cost
at O(1). Just like before, don't modify the input.

Drawing pictures will help a lot with this one. Grab some paper and pencil (or a
whiteboard, if you have one).

https://www.interviewcake.com/question/javascript/find-duplicate-optimize-for-space-beast-mode?course=fc1&section=trees-graphs
*/

/**
 * Find a duplicate integer in a list of integers in range [1..n] and of length
 * n+1. Treat the list as a graph with the last element being the head. Assume
 * every value is a pointer to the next position (index + 1) in the list. The
 * duplicate integer is the position of the start of a cycle.
 */
const findDupSpaceEdBeast = (list: number[]): number => {
    // Grab the current position from the "head" of the graph, i.e., the final
    // element in the list
    let cycleProbePntr = list[list.length - 1];

    // Traverse the "graph" `n` moves to guarantee we're within a cycle, the
    // head of which will be a duplicate
    for (let i = 1; i < list.length - 1; i++) {
        cycleProbePntr = list[cycleProbePntr - 1];
    }

    // Find the length of the cycle by advancing a second pointer until we meet
    // the first
    let cycleSize = 1;
    let cycleSizePntr = list[cycleProbePntr - 1];

    while (cycleSizePntr !== cycleProbePntr) {
        cycleSizePntr = list[cycleSizePntr - 1];
        cycleSize++;
    }

    // Find the beginning of the cycle by starting one pointer ahead by the
    // cycle size, and the other at the head. Advance each pointer by 1 until
    // they meet, which will be the beginning of the cycle, which will be a
    // reference to the duplicate!
    let aheadPntr = list[list.length - 1];
    let startPntr = list[list.length - 1];

    for (let i = 0; i < cycleSize; i++) {
        aheadPntr = list[aheadPntr - 1];
    }

    while (startPntr !== aheadPntr) {
        startPntr = list[startPntr - 1];
        aheadPntr = list[aheadPntr - 1];
    }

    return startPntr;
};

export default findDupSpaceEdBeast;
