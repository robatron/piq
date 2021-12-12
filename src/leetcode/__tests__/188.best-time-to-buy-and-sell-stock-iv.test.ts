import { maxProfit } from '../188.best-time-to-buy-and-sell-stock-iv';
import { createTests } from './utils';

createTests(
    [
        [[2, [2, 4, 1]], 2],
        [[2, [3, 2, 6, 5, 0, 3]], 7],
    ],
    maxProfit,
    { spreadInput: true },
);
