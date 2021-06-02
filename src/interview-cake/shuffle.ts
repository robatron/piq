/*
Write a function for doing an in-place shuffle of an array.

The shuffle must be "uniform," meaning each item in the original array must have
the same probability of ending up in each spot in the final array.

Assume that you have a function getRandom(floor, ceiling) for getting a random
integer that is >= floor and <= ceiling.
*/

/**
 * Uniformly shuffle without modifying the original list. Simply walk through
 * the original list and choose a random spot for it in a new empty list that
 * hasn't already been filled. This is higher in both time and space complexity
 * because of the nested loop required to find the next empty spot in the sorted
 * list, and because there is a second list. O(n^2) time, O(n) space.
 *
 * Time: O(n^2), space: O(n)
 */
export const shuffle = (list: unknown[]): unknown[] => {
    const sortedList: unknown[] = new Array(list.length);

    list.forEach((item) => {
        let targetIdx = Math.floor(Math.random() * list.length);
        let targetValue = sortedList[targetIdx];

        while (targetValue !== undefined) {
            targetIdx = (targetIdx + 1) % list.length;
            targetValue = sortedList[targetIdx];
        }

        sortedList[targetIdx] = item;
    });

    return sortedList;
};

/**
 * Uniformly shuffle a list in place. Walk through every slot starting from the
 * beginning and choose a random item from the rest of the list to fill it. Swap
 * the chosen item with the existing item in the current slot. A.k.a.
 * Fisher-Yates shuffle. O(n) time, O(1) space.
 */
export const shuffleInPlace = (list: unknown[]): void => {
    for (let i = 0; i < list.length; i++) {
        const pickIdx = Math.floor(Math.random() * (list.length - i) + i);
        const pickItem = list[pickIdx];
        list[pickIdx] = list[i];
        list[i] = pickItem;
    }
};
