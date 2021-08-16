/*
You are a renowned thief who has recently switched from stealing precious metals
to stealing cakes because of the insane profit margins. You end up hitting the
jackpot, breaking into the world's largest privately owned stock of cakes—the
vault of the Queen of England.

While Queen Elizabeth has a limited number of types of cake, she has an
unlimited supply of each type.

Each type of cake has a weight and a value, stored in an object with two
properties:

    1. weight: the weight of the cake in kilograms
    2. value: the monetary value of the cake in British shillings

For example:

    // Weighs 7 kilograms and has a value of 160 shillings
    { weight: 7, value: 160 }

    // Weighs 3 kilograms and has a value of 90 shillings
    { weight: 3, value: 90 }

You brought a duffel bag that can hold limited weight, and you want to make off
with the most valuable haul possible.

Write a function maxDuffelBagValue() that takes an array of cake type objects
and a weight capacity, and returns the maximum monetary value the duffel bag can
hold.

For example:

    const cakeTypes = [
        { weight: 7, value: 160 },
        { weight: 3, value: 90 },
        { weight: 2, value: 15 },
    ];

    const capacity = 20;

    maxDuffelBagValue(cakeTypes, capacity);
    // Returns 555 (6 of the middle type of cake and 1 of the last type of cake)

Weights and values may be any non-negative integer. Yes, it's weird to think
about cakes that weigh nothing or duffel bags that can't hold anything. But
we're not just super mastermind criminals—we're also meticulous about keeping
our algorithms flexible and comprehensive.

https://www.interviewcake.com/question/javascript/cake-thief?course=fc1&section=dynamic-programming-recursion
*/

export type CakeType = {
    size: number;
    value: number;
};

export const maxBagValue = (cakes: CakeType[], bagSize: number): number => {
    // Track the max value at every bag size from zero to bagSize inclusive
    const maxValAtSize: number[] = new Array(bagSize + 1).fill(0);

    // Update the max value of each bag size for all cakes that can fit
    for (let curBagSize = 0; curBagSize <= bagSize; curBagSize++) {
        for (let cakeIdx = 0; cakeIdx < cakes.length; cakeIdx++) {
            const cake = cakes[cakeIdx];

            // Special case: cake is dimensionless but has value which means we
            // can fit an infinite number of cakes in the bag and the max value
            // is also infinite
            if (!cake.size && cake.value) {
                return Infinity;
            }

            // If the current cake fits in the bag, determine the remaining
            // space in the bag, and add the max value at that bag size to the
            // current cake value. If the total value is bigger than the max
            // value at the current bag size, update it.
            if (cake.size <= curBagSize) {
                const remainingBagSize = curBagSize - cake.size;
                const curVal = maxValAtSize[remainingBagSize] + cake.value;

                maxValAtSize[curBagSize] = Math.max(
                    maxValAtSize[curBagSize],
                    curVal,
                );
            }
        }
    }

    // Return the max value at the original bag size
    return maxValAtSize[bagSize];
};
