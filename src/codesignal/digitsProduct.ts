/*
Given an integer product, find the smallest positive (i.e. greater than 0)
integer the product of whose digits is equal to product. If there is no such
integer, return -1 instead.

Example:

- For product = 12, the output should be digitsProduct(product) = 26;

- For product = 19, the output should be digitsProduct(product) = -1.

Input/Output:

- [execution time limit] 5 seconds (ts)
- [input] integer product
  - Guaranteed constraints: 0 ≤ product ≤ 600.
- [output] integer

https://app.codesignal.com/arcade/intro/level-12/NJJhENpgheFRQbPRA
*/

const digitsProduct = (product: number): number => {
    // Special case: no positive factors of 0, so the smallest integer >0 whose
    // digits equal the product is "10"
    if (product === 0) {
        return 10;
    }

    // Get all single-digit positive factors of the product
    const smallFactors: number[] = [...Array(product + 1).keys()].filter(
        (i) => product % i === 0 && i < 10,
    );

    // Track all factor combos of every product from 0 thru
    const factorCombosPerProduct: number[][][] = [
        ...Array(product + 1).keys(),
    ].map(() => []);

    // Find all combos of factors for every product from 0 thru `product`
    smallFactors.forEach((curFactor) => {
        // Start at the current factor since we can't make any factor combos
        // with products smaller than the current factor
        for (let curProduct = curFactor; curProduct <= product; curProduct++) {
            // What's the remaining factor after dividing out the current one,
            // and is it valid (ie not a decimal)?
            const remainingFactor: number = curProduct / curFactor;
            const isRemainingFactorValid: boolean =
                curProduct % curFactor === 0;

            if (isRemainingFactorValid) {
                const remainingFactorCombos: number[][] =
                    factorCombosPerProduct[remainingFactor];

                // The factor combo for this product is only composed of this
                // factor if there are no remaining factors, or if the remaining
                // factor is 1
                if (!remainingFactor || remainingFactor === 1) {
                    factorCombosPerProduct[curProduct].push([curFactor]);
                }

                // The factor combo for this product is composed only of this
                // factor and the remaining factor if there are no factor combos
                // for the remaining factor and the remaining factor is < 10
                else if (
                    !remainingFactorCombos?.length &&
                    remainingFactor < 10
                ) {
                    factorCombosPerProduct[curProduct].push([
                        curFactor,
                        remainingFactor,
                    ]);
                }

                // Otherwise, factor combos for this product are just the
                // remainder factor combos with this factor appended
                else {
                    remainingFactorCombos.forEach((remainingFactorCombo) => {
                        factorCombosPerProduct[curProduct].push(
                            remainingFactorCombo.concat(curFactor),
                        );
                    });
                }
            }
        }
    });

    // Convert every factor combo into their smallest possible integers by
    // sorting every factor combo list smallest -> largest, then converting each
    // list into an integer, eg [1, 2, 3] => 123
    const factorComboNumbers: number[] = factorCombosPerProduct[product].map(
        (combo) =>
            combo
                .sort((a, b) => a - b)
                .reduce(
                    (sum, digit, i) =>
                        sum + digit * Math.pow(10, combo.length - i - 1),
                    0,
                ),
    );

    // Return the smallest factor combo number or -1 if there aren't any
    return factorComboNumbers.length ? Math.min(...factorComboNumbers) : -1;
};

export default digitsProduct;
