import { checkPalendrome } from '../checkPalendrome';

test('valid palendromes', () => {
    [
        '',
        'abba',
        'kayak',
        'racecar',
        'A man, a plan, a canal: Panama'
            .replace(/[^\w]/g, '')
            .split('')
            .map((c) => c.toLocaleLowerCase())
            .join(''),
    ].forEach((validPalendromes) => {
        expect(checkPalendrome(validPalendromes)).toBe(true);
    });
});

test('invalid palendromes', () => {
    [
        'cat',
        'homer',
        'racecars',
        'A man, a plan, a canal: Suez'
            .replace(/[^\w]/g, '')
            .split('')
            .map((c) => c.toLocaleLowerCase())
            .join(''),
    ].forEach((pal) => {
        expect(checkPalendrome(pal)).toBe(false);
    });
});
