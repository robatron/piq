import {
    coinChangeRecurs,
    coinChangeDPTD,
    coinChangeDPBU,
} from '../322.coin-change';
import { createTests } from './utils';

type InsAndOuts = [[number[], number], number][];

const ios: InsAndOuts = [
    [[[1, 2, 5], 11], 3],

    [[[1], 1], 1],
    [[[1], 2], 2],

    // No coins are required to make an amount of 0
    [[[1], 0], 0],
    [[[1, 2, 5], 0], 0],

    // Can't make the amount with the available coins
    [[[2], 3], -1],
];

const iosHard: InsAndOuts = [[[[186, 419, 83, 408], 6249], 20]];

createTests(ios, coinChangeRecurs, {
    spreadInput: true,
    name: 'coinChangeRecurs',
});
createTests([...ios, ...iosHard], coinChangeDPTD, {
    spreadInput: true,
    name: 'coinChangeDPTD',
});
createTests([...ios, ...iosHard], coinChangeDPBU, {
    spreadInput: true,
    name: 'coinChangeDPBU',
});
