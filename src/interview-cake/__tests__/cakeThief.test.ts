/*
let desc = 'one cake';
let actual = maxDuffelBagValue([{ weight: 2, value: 1 }], 9);
let expected = 4;
assertEqual(actual, expected, desc);

desc = 'two cakes';
actual = maxDuffelBagValue([
  { weight: 4, value: 4 },
  { weight: 5, value: 5}], 9);
expected = 9;
assertEqual(actual, expected, desc);

desc = 'only take less valuable cake';
actual = maxDuffelBagValue([
  { weight: 4, value: 4 },
  { weight: 5, value: 5 }], 12);
expected = 12;
assertEqual(actual, expected, desc);

desc = 'lots of cakes';
actual = maxDuffelBagValue([
  { weight: 2, value: 3 },
  { weight: 3, value: 6 },
  { weight: 5, value: 1 },
  { weight: 6, value: 1 },
  { weight: 7, value: 1 },
  { weight: 8, value: 1 }], 7);
expected = 12;
assertEqual(actual, expected, desc);

desc = 'value to weight ratio is not optimal';
actual = maxDuffelBagValue([
  { weight: 51, value: 52 },
  { weight: 50, value: 50 }], 100);
expected = 100;
assertEqual(actual, expected, desc);

desc = 'zero capacity';
actual = maxDuffelBagValue([{ weight: 1, value: 2 }], 0);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'cake with zero value and weight';
actual = maxDuffelBagValue([
  { weight: 0, value: 0 },
  { weight: 2, value: 1 }], 7);
expected = 3;
assertEqual(actual, expected, desc);

desc = 'cake with non-zero value and zero weight';
actual = maxDuffelBagValue([{ weight: 0, value: 5 }], 5);
assertEqual(isFinite(actual), false, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}
*/

import { CakeType, maxBagValue } from '../cakeThief';

describe('maxBagValue', () => {
    /*
    let desc = 'one cake';
    let actual = maxDuffelBagValue([{ weight: 2, value: 1 }], 9);
    let expected = 4;
    assertEqual(actual, expected, desc);
    */
    it('returns the max value of a selection of one cake', () => {
        const cakes: CakeType[] = [{ size: 2, value: 1 }];
        const bagSize = 9;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 4;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'two cakes';
    actual = maxDuffelBagValue([
    { weight: 4, value: 4 },
    { weight: 5, value: 5}], 9);
    expected = 9;
    assertEqual(actual, expected, desc);
    */
    it('returns the max value of a selection of 2 cakes', () => {
        const cakes: CakeType[] = [
            { size: 4, value: 4 },
            { size: 5, value: 5 },
        ];
        const bagSize = 9;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 9;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'only take less valuable cake';
    actual = maxDuffelBagValue([
    { weight: 4, value: 4 },
    { weight: 5, value: 5 }], 12);
    expected = 12;
    assertEqual(actual, expected, desc);
    */
    it('returns the max value comprising the less valuable cake', () => {
        const cakes: CakeType[] = [
            { size: 4, value: 4 },
            { size: 5, value: 5 },
        ];
        const bagSize = 12;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 12;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'lots of cakes';
    actual = maxDuffelBagValue([
    { weight: 2, value: 3 },
    { weight: 3, value: 6 },
    { weight: 5, value: 1 },
    { weight: 6, value: 1 },
    { weight: 7, value: 1 },
    { weight: 8, value: 1 }], 7);
    expected = 12;
    assertEqual(actual, expected, desc);
    */
    it('returns the max value of lots of cakes', () => {
        const cakes: CakeType[] = [
            { size: 2, value: 3 },
            { size: 3, value: 6 },
            { size: 5, value: 1 },
            { size: 6, value: 1 },
            { size: 7, value: 1 },
            { size: 8, value: 1 },
        ];
        const bagSize = 7;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 12;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'value to weight ratio is not optimal';
    actual = maxDuffelBagValue([
    { weight: 51, value: 52 },
    { weight: 50, value: 50 }], 100);
    expected = 100;
    assertEqual(actual, expected, desc);
    */
    it('returns the max value of cakes whose value:size ratio is unoptimal', () => {
        const cakes: CakeType[] = [
            { size: 51, value: 52 },
            { size: 50, value: 50 },
        ];
        const bagSize = 100;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 100;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'zero capacity';
    actual = maxDuffelBagValue([{ weight: 1, value: 2 }], 0);
    expected = 0;
    assertEqual(actual, expected, desc);
    */
    it('returns 0 if the bag size is 0', () => {
        const cakes: CakeType[] = [
            { size: 1, value: 1 },
            { size: 2, value: 2 },
            { size: 3, value: 3 },
        ];
        const bagSize = 0;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 0;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'cake with zero value and weight';
    actual = maxDuffelBagValue([
    { weight: 0, value: 0 },
    { weight: 2, value: 1 }], 7);
    expected = 3;
    assertEqual(actual, expected, desc);
    */
    it('handles dimensionless cakes with no value', () => {
        const cakes: CakeType[] = [
            { size: 0, value: 0 },
            { size: 2, value: 1 },
        ];
        const bagSize = 7;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = 3;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'cake with non-zero value and zero weight';
    actual = maxDuffelBagValue([{ weight: 0, value: 5 }], 5);
    assertEqual(isFinite(actual), false, desc);
    */
    it('handles dimensionless cakes with some value', () => {
        const cakes: CakeType[] = [{ size: 0, value: 5 }];
        const bagSize = 5;
        const actual = maxBagValue(cakes, bagSize);
        const expctd = Infinity;

        expect(actual).toBe(expctd);
    });
});
