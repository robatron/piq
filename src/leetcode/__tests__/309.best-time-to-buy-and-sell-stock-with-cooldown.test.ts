import { maxProfit } from '../309.best-time-to-buy-and-sell-stock-with-cooldown';
import { createTests } from './utils';

createTests(
    [
        [[1], 0],
        [[1, 2, 3, 0, 2], 3],
        [[1, 2, 4], 3],
    ],
    maxProfit,
);
