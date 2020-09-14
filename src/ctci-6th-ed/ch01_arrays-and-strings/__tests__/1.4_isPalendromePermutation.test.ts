import { isPalendromePermutation } from '../1.4_isPalendromePermutation';

describe('isPalendromePermutation', () => {
    describe('base cases', () => {
        it('considers a zero-length string a palendrome', () => {
            expect(isPalendromePermutation('')).toBe(true);
        });

        it('considers a 1-length string a palendrome', () => {
            expect(isPalendromePermutation('a')).toBe(true);
        });
    });

    describe('positive detections', () => {
        it('detects the problem example', () => {
            expect(isPalendromePermutation('Tact Coa')).toBe(true);
        });

        it('detects simple even palendromes', () => {
            ['anna', 'boob', 'noon'].forEach((p) => {
                expect(isPalendromePermutation(p)).toBe(true);
            });
        });

        it('detects simple even palendromes', () => {
            ['kayak', 'racecar', 'zerorez'].forEach((p) => {
                expect(isPalendromePermutation(p)).toBe(true);
            });
        });

        it('detects palendromes with non-word characters and capitals', () => {
            [
                'A man, a plan, a canal: Panama.',
                'A nut for a jar of tuna?',
                'Yo, banana boy!',
            ].forEach((p) => {
                expect(isPalendromePermutation(p)).toBe(true);
            });
        });
    });

    describe('negative detections', () => {
        it('detects simple even false palendromes', () => {
            ['abcd', 'efghij', 'klmnopqrst'].forEach((p) => {
                expect(isPalendromePermutation(p)).toBe(false);
            });
        });

        it('detects simple odd false palendromes', () => {
            ['abc', 'efghi', 'klmnopqrs'].forEach((p) => {
                expect(isPalendromePermutation(p)).toBe(false);
            });
        });

        it('detects false palendromes with non-word characters and capitals', () => {
            [
                "A verbal contract isn't worth the paper it's printed on.",
                'To alcohol! The cause of … and solution to … all of life’s problems.',
                "Well, well, well, if it isn't the consequences of my own actions.",
            ].forEach((p) => {
                expect(isPalendromePermutation(p)).toBe(false);
            });
        });
    });
});
