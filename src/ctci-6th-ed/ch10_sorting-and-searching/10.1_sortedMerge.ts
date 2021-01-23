/**
 * 10.1 - Sorted Merge
 *
 * You are given two sorted arrays, A and B, where A has a large enough buffer
 * at the end to hold B. Write a method to merge B into A in sorted order.
 * Returns a new array.
 */

import { SortDirection } from './sortUtils';

/**
 * Merge two sorted lists together into a new list
 */
export const mergeSorted = (
    listA: Array<number> = [],
    listB: Array<number> = [],
    sortDir: SortDirection = SortDirection.ascending,
): Array<number> => {
    const mergedList: Array<number> = [];
    let pointerA = 0;
    let pointerB = 0;

    // If either list is empty, just return a shallow copy of the other list
    if (!listA.length) {
        return listB.slice();
    }

    if (!listB.length) {
        return listA.slice();
    }

    // Helper function to throw an error if an input list is out of order
    const failOnInputListOrder = (item, prevItem, listName) => {
        const isWrongOrder =
            sortDir === SortDirection.ascending
                ? item < prevItem
                : item > prevItem;

        if (isWrongOrder) {
            throw new Error(
                `Input list '${listName}' is not in ${SortDirection[sortDir]} order as expected`,
            );
        }
    };

    // Advance pointers through both lists (one per list), compare the values
    // at each pointer, and push the value onto the mergedList such that it
    // maintains the specified sort order. Stop when either pointer reaches the
    // end of its list. Additionally verify the order of the input lists.
    while (pointerA < listA.length && pointerB < listB.length) {
        const itemA = listA[pointerA];
        const itemB = listB[pointerB];

        failOnInputListOrder(itemA, listA[pointerA - 1], 'listA');
        failOnInputListOrder(itemB, listB[pointerB - 1], 'listB');

        const chooseItemA =
            sortDir === SortDirection.ascending ? itemA < itemB : itemA > itemB;

        if (chooseItemA) {
            mergedList.push(itemA);
            ++pointerA;
        } else if (!chooseItemA) {
            mergedList.push(itemB);
            ++pointerB;
        } else {
            mergedList.push(itemA, itemB);
            ++pointerA;
            ++pointerB;
        }
    }

    // If there are any left over items in either input list, push them onto
    // the mergedList, again verifying input list order.
    const pushRemaining = (list, pointer, listName) => {
        if (pointer < list.length) {
            list.slice(pointer).forEach((item, idx) => {
                failOnInputListOrder(item, list[idx - 1], listName);
                mergedList.push(item);
            });
        }
    };

    pushRemaining(listA, pointerA, 'listA');
    pushRemaining(listB, pointerB, 'listB');

    // Finally, return the mergedList which should contain the combined and
    // sorted elements of both lists
    return mergedList;
};

/**
 * Merge listB into listA *in place*. This function is more "C-like" and better
 * aligns with the spirit of the problem than than `mergeSorted()`. This does
 * not check if the lists are in order, so results will probably be wrong if
 * they're not. (Garbage in / garbage out and all that.)
 */
export const mergeSortedInPlace = (
    listA: Array<number>,
    listB: Array<number>,
    sortDir: SortDirection = SortDirection.ascending,
): void => {
    let pointerA = 0;
    let pointerB = 0;

    if (!Array.isArray(listA) || !Array.isArray(listB)) {
        throw new Error('Neither listA nor listB may `undefined` nor `null`');
    }

    while (pointerA < listA.length && pointerB < listB.length) {
        const itemA = listA[pointerA];
        const itemB = listB[pointerB];

        // Determine if itemB should preceed itemA based on sort order
        const itemBGoesFirst =
            sortDir === SortDirection.ascending ? itemA > itemB : itemA < itemB;

        // If itemA and itemB are equal, copy every item over to the right by
        // one, increasing listA's length by one. This will result in a
        // duplicate itemA at pointerA's index, as if itemB were injected there.
        // Additionally, if itemBGoesFirst, overwrite this duplicate itemA value
        // with itemB.
        if (itemA === itemB || itemBGoesFirst) {
            for (let i = listA.length - 1; i >= pointerA; i--) {
                listA[i + 1] = listA[i];
            }

            if (itemBGoesFirst) {
                listA[pointerA] = itemB;
            }

            pointerB++;
        }

        // Always advance pointerA because:
        //  1. If itemA and itemB are equal OR if itemBGoesFirst, listA's
        //     length increases by one, so we must advance the pointer to
        //     compensate.
        //  2. Otherwise, itemA goes first, but since itemA is already in listA
        //     in the target location, there's nothing to do, so just advance
        //     the pointer.
        pointerA++;
    }

    // If there are items left in listB, push them onto the end of listA. If
    // there are left over items in listA, there's nothing to do since all
    // items are already where they're supposed to be
    while (pointerB < listB.length) {
        listA[pointerA] = listB[pointerB];
        pointerA++;
        pointerB++;
    }
};
