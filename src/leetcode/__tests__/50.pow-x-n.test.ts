import { myPow } from '../50.pow-x-n';
import { createTests } from './utils';

createTests(
    [
        // Examples

        // 2^10
        // 2^5 *            2^5
        // 2^2 * 2^2 * 2 *  2^2 * 2^2 * 2
        // 2 * 2 * 2 * 2 *  2 * 2 * 2 * 2 * 2 * 2
        [[2.0, 10], 1024.0],

        // Slight adjustment for precision error. LC submission tests agree.
        [[2.1, 3], 9.261000000000001],

        [[2.0, -2], 0.25],
    ],
    myPow,
    { spreadInput: true },
);
