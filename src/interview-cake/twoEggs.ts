/*
Problem
=======

A building has 100 floors. One of the floors is the highest floor an egg can be
dropped from without breaking.

If an egg is dropped from above that floor, it will break. If it is dropped from
that floor or below, it will be completely undamaged and you can drop the egg
again.

Given two eggs, find the highest floor an egg can be dropped from without
breaking, with as few drops as possible.

Notes
=====

What floor can we start dropping the first egg from? We can set up the floors to
skip by the first egg as a triangular series, so we can solve for n in the
following equation. (See explaination in link below.)

    ( n^2 + n ) / 2 = floors
    n^2 + n - 2 * floors

We can use the positive answer of the quadradic formula where: a = 1, b = 1, and
c = -2 * floors

    n = ( -b +/- sqrt( b^2 - 4ac ) ) / 2a
      = ( -1 + sqrt( 1^2 - 4 * 1 * -2 * floors ) ) / 2 * 1
      = ( -1 + sqrt( 1 + 8 * floors ) ) / 2

This is also called the "triangular root" (which is analogous to a square root).

    n = ( sqrt( 8 * floors + 1 ) - 1 ) / 2

Finally, we need to round up since we can't go up fractional floors. (E.g. 13.65
=> 14 for 100 floors)

Reference
=========

- [Two Egg Problem](https://www.interviewcake.com/question/javascript/two-egg-problem?course=fc1&section=combinatorics-probability-math]
- [Triangular roots](https://en.wikipedia.org/wiki/Triangular_number#Triangular_roots_and_tests_for_triangular_numbers)
*/

// Which of the two eggs are safe?
export enum SafeEggs {
    none,
    last,
    both,
}

// Result of a two-egg drop test, the minimum number of required drops, the
// floors from which the eggs were dropped, and the eggs that survived, if any
export type TwoEggDropResult = {
    dropCount: number;
    dropFloors: number[][];
    safeEggs: SafeEggs;
};

// Using two eggs, find the fewest number of drops you'd need to find the
// highest "safe floor", i.e., the highest floor an egg can be dropped from and
// survive. Also return the floors the eggs were dropped from, and indicate eggs
// that survived, if any.
export const getMin2EggDropCount = (
    // How many floors is the building?
    floorCount: number,

    // What's the highest safe floor an egg can be dropped from and survive?
    maxSafeFloor: number,
): TwoEggDropResult => {
    // Verify the highest safe floor is one of the floors
    if (!(1 <= maxSafeFloor && maxSafeFloor <= floorCount)) {
        throw new Error(`Max safe floor must be from 1 to ${floorCount}`);
    }

    // If there's only one floor, it's also the highest safe floor, so we don't
    // have to do anything, and both eggs are safe
    if (floorCount === 1) {
        return {
            dropCount: 0,
            dropFloors: [[], []],
            safeEggs: SafeEggs.both,
        };
    }

    // What floor should we start dropping the first egg at? Since we'll be
    // skipping floors in a triangular series, we can just find the triangular
    // root and and round up. (See notes at top of file.)
    const startDropFloor = Math.ceil((Math.sqrt(1 + 8 * floorCount) - 1) / 2);

    // Most-recent floor we dropped an egg from
    let prevDropFloor = 0;

    // Floor the first egg broke on. We can use this to prevent dropping the
    // last egg from the same floor unnecessarily.
    let firstEggBreakFloor: number;

    // Main result to modify and return
    const result: TwoEggDropResult = {
        // Total number of times we've dropped eggs
        dropCount: 0,

        // Floors we've dropped both eggs from. (Not required for main
        // algorithm, but interesting info anyway.)
        dropFloors: [[], []],

        // Both eggs start unbroken
        safeEggs: SafeEggs.both,
    };

    // Start by dropping the first egg in an optimal skipping pattern until it
    // breaks or we can't drop it anymore. Next, if we can still drop the last
    // egg, drop it floor-by-floor until we find the highest safe floor!
    for (let egg = 0; egg < 2; egg++) {
        while (prevDropFloor <= maxSafeFloor) {
            const isFirstEgg = !egg;
            const isLastEgg = egg;

            // Calculate the next floor we plan to drop the current egg from.
            // The first egg starts at the initial drop floor, then the same
            // amount -1 per drop. The last egg just goes up one at a time.
            const nextDropFloor: number =
                prevDropFloor +
                (isFirstEgg ? startDropFloor - result.dropCount : 1);

            // Don't drop the egg if it's above the highest floor
            if (nextDropFloor > floorCount) {
                break;
            }

            // OMLETTE CONDITION: Can we save the last egg? If we're about to
            // drop the last egg from the same floor we already broke the first
            // egg on, we can save it!
            if (isLastEgg && nextDropFloor === firstEggBreakFloor) {
                return result;
            }

            // Actually drop the current egg
            result.dropCount++;
            result.dropFloors[egg].push(nextDropFloor);

            // OMLETTE CONDITION: Can we save the any of the eggs? If an egg
            // survives the floor just below the highest floor, we know the
            // highest floor is the max safe floor and can save it! If this is
            // the last egg, it means the first has already broken.
            if (nextDropFloor === floorCount - 1) {
                if (isLastEgg) {
                    result.safeEggs = SafeEggs.last;
                }
                return result;
            }

            // EGG-BREAK CONDITION: If the first egg breaks, only the last egg has the
            // possibility of being safe unless the last one breaks after
            if (nextDropFloor > maxSafeFloor) {
                firstEggBreakFloor = isFirstEgg && nextDropFloor;
                result.safeEggs = isFirstEgg ? SafeEggs.last : SafeEggs.none;
                break;
            }

            prevDropFloor = nextDropFloor;
        }
    }

    return result;
};
