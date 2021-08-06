import findDupSpaceEdBeast from '../findDupSpaceEdBeast';

/*
let desc = 'just the repeated number';
let actual = findDuplicate([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findDuplicate([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findDuplicate([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findDuplicate([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}
*/

it('finds the repeated number in short list of only the repeated number', () => {
    const list = [1, 1];
    expect(findDupSpaceEdBeast(list)).toBe(1);
});

it('finds the repeated value an a short list', () => {
    const list = [1, 2, 3, 2];
    expect(findDupSpaceEdBeast(list)).toBe(2);
});

it('finds the repeated value an a medium list', () => {
    const list = [1, 2, 5, 5, 5, 5];
    expect(findDupSpaceEdBeast(list)).toBe(5);
});

it('finds the repeated value an a long list', () => {
    const list = [4, 1, 4, 8, 3, 2, 7, 6, 5];
    expect(findDupSpaceEdBeast(list)).toBe(4);
});

it('finds the repeated value in another long list', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 4];
    expect(findDupSpaceEdBeast(list)).toBe(4);
});

it('finds the repeated value in yet another long list', () => {
    const list = [8, 4, 9, 8, 4, 7, 4, 6, 4, 10, 8];
    expect(findDupSpaceEdBeast(list)).toBe(8);
});
