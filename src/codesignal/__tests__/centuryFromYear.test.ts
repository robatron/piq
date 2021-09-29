import { centuryFromYear } from '../centuryFromYear';

test('returns the century number for a typical given year', () => {
    expect(centuryFromYear(1989)).toBe(20);
});

test('year 0', () => {
    expect(centuryFromYear(0)).toBe(1);
});

test('negative years', () => {
    expect(centuryFromYear(-5)).toBe(-1);
});

test('future years', () => {
    expect(centuryFromYear(2121)).toBe(22);
});

test('far future years', () => {
    expect(centuryFromYear(21210)).toBe(213);
});
