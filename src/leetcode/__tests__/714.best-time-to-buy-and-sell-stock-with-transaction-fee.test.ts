import { maxProfit } from '../714.best-time-to-buy-and-sell-stock-with-transaction-fee';
import { createTests } from './utils';

createTests(
    [
        [[[5], 3], 0],
        [[[1, 3, 2, 8, 4, 9], 2], 8],
    ],
    maxProfit,
    {
        spreadInput: true,
    },
);
