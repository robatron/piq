import { digitToNum, multiply } from '../43.multiply-strings';
import { createTests } from './utils';

describe('digitStrToNum', () => {
    const ios: [string, number][] = Array(10)
        .fill(0)
        .map((_, i) => [i.toString(), i]);
    createTests(ios, digitToNum);
});

describe('multiply', () => {
    const ios: [string[], string][] = [
        [['0', '0'], '0'],
        [['2', '3'], '6'],
        [['9', '9'], '81'],
        [['32', '469'], '15008'],

        // Attempting `Number.MAX_SAFE_INTEGER * 5` will result in
        // 45035996273704950 which a wrong answer. We can verify the correct
        // answer with BigInt: BigInt(Number.MAX_SAFE_INTEGER) * BigInt(5) =
        // 45035996273704955
        [['9007199254740991', '5'], '45035996273704955'],
    ];
    createTests(ios, multiply, { spreadInput: true });
});
