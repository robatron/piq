/*
let desc = 'one drone';
let actual = findUniqueDeliveryId([1]);
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'unique ID comes first';
actual = findUniqueDeliveryId([1, 2, 2]);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'unique ID comes last';
actual = findUniqueDeliveryId([3, 3, 2, 2, 1]);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'unique ID in middle';
actual = findUniqueDeliveryId([3, 2, 1, 2, 3]);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'many drones';
actual = findUniqueDeliveryId([2, 5, 4, 8, 6, 3, 1, 4, 2, 3, 6, 5, 1]);
expected = 8;
assertEquals(actual, expected, desc);
*/

import { findUniqueDeliveryId } from '../stolenDrone';

test('no drones', () => {
    expect(findUniqueDeliveryId([])).toBe(0);
});

test('one drone', () => {
    const dIDs = [3];
    expect(findUniqueDeliveryId(dIDs)).toBe(dIDs[0]);
});

test('unique ID comes first', () => {
    const dIDs = [1, 2, 2, 3, 3];
    expect(findUniqueDeliveryId(dIDs)).toBe(1);
});

test('unique ID comes last', () => {
    const dIDs = [3, 3, 2, 2, 1];
    expect(findUniqueDeliveryId(dIDs)).toBe(1);
});

test('unique ID in middle', () => {
    const dIDs = [3, 2, 1, 2, 3];
    expect(findUniqueDeliveryId(dIDs)).toBe(1);
});

test('many drones', () => {
    const dIDs = [2, 5, 4, 8, 6, 3, 1, 4, 2, 3, 6, 5, 1];
    expect(findUniqueDeliveryId(dIDs)).toBe(8);
});

// Just gut checking bit shift multiplication and division
test('Bonus bit shift tests', () => {
    expect(6 >> 1).toBe(3);
    expect(6 << 1).toBe(12);
});
