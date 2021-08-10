import getPerms from '../recursiveStringPerms';
/*
let desc = 'empty string';
let input = '';
let actual = getPermutations(input);
let expected = new Set(['']);
assert(isSetsEqual(actual, expected), desc);

desc = 'one character string';
input = 'a';
actual = getPermutations(input);
expected = new Set(['a']);
assert(isSetsEqual(actual, expected), desc);

desc = 'two character string';
input = 'ab';
actual = getPermutations(input);
expected = new Set(['ab', 'ba']);
assert(isSetsEqual(actual, expected), desc);

desc = 'three character string';
input = 'abc';
actual = getPermutations(input);
expected = new Set([
    'abc',
    'acb',
    'bac',
    'bca',
    'cab',
    'cba'
]);
assert(isSetsEqual(actual, expected), desc);

function isSetsEqual(as, bs) {
  if (as.size !== bs.size) {
    return false;
  }
  for (let a of as) {
    if (!bs.has(a)) return false;
  }
  return true;
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL`);
  }
}
*/
const isSetsEqual = (as: Set<number>, bs: Set<number>): boolean => {
    if (as.size !== bs.size) {
        return false;
    }

    for (const a of as) {
        if (!bs.has(a)) {
            return false;
        }
    }

    return true;
};

it('handles an empty string', () => {
    const input = '';
    const actual = getPerms(input);
    const expected = new Set(['']);

    expect(isSetsEqual(actual, expected)).toBe(true);
});

it('handles a single-char string', () => {
    const input = 'a';
    const actual = getPerms(input);
    const expected = new Set(['a']);

    expect(isSetsEqual(actual, expected)).toBe(true);
});

it('handles a two character string', () => {
    const input = 'ab';
    const actual = getPerms(input);
    const expected = new Set(['ab', 'ba']);

    expect(isSetsEqual(actual, expected)).toBe(true);
});

it('handles a multi-char string', () => {
    const input = 'abc';
    const actual = getPerms(input);
    console.log(
        '🚀 ~ file: recursiveStringPermutations.test.ts ~ line 91 ~ it ~ actual',
        actual,
    );
    const expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);

    expect(isSetsEqual(actual, expected)).toBe(true);
});
