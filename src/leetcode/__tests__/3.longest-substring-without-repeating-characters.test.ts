import {
    lengthOfLongestSubstring,
    lengthOfLongestSubstringOlder,
    lengthOfLongestSubstringOldest,
    MAX_INPUT_DISPLAY_LENGTH,
} from '../3.longest-substring-without-repeating-characters';
import { createTests } from './utils';

const large: [string, number] = [
    'l: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    64,
];

const xLarge: [string, number] = [
    'xl: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '.repeat(
        400,
    ),
    95,
];

[
    [lengthOfLongestSubstring, '⭐️'],
    [lengthOfLongestSubstringOlder, '💁'],
    [lengthOfLongestSubstringOldest, '🙅'],
].forEach(([fn, testNamePrefix]: [(s: string) => number, string]) =>
    createTests(
        [
            ['', 0],
            ['a', 1],
            ['au', 2],
            ['aab', 2],
            ['dvdf', 3],
            ['pwwkew', 3],
            ['abcabcbb', 3],
            ['longest-substring-without-repeating-characters', 10],
            large,
            xLarge,
        ],
        fn,
        { testNamePrefix, maxInputDisplayLen: MAX_INPUT_DISPLAY_LENGTH },
    ),
);
