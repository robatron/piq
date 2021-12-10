import { wordBreak } from '../139.word-break';
import { createTests } from './utils';

type Inputs = [string, string[]];
type Output = boolean;
type InsAndOuts = [Inputs, Output][];
const ios: InsAndOuts = [
    [['leetcode', ['leet', 'code']], true],
    [['applepenapple', ['apple', 'pen']], true],
    [['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], false],
];

createTests(ios, wordBreak, {
    spreadInput: true,
});
