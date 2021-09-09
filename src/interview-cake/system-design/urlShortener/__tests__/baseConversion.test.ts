import { convertFromBase10 } from '../baseConversion';

describe('convertFromBase10', () => {
    const HEX_CHARS = '0123456789ABCDEF';

    it('converts a sample base 10 number to an arbitrary base given set of base chars', () => {
        const srcNum = 395;
        const destBaseChars = HEX_CHARS;
        const actual = convertFromBase10(srcNum, destBaseChars);
        const expectd = '18B';

        expect(actual).toBe(expectd);
    });

    it('converts another sample base 10 number to an arbitrary base given set of base chars', () => {
        const srcNum = 110;
        const destBaseChars = HEX_CHARS;
        const actual = convertFromBase10(srcNum, destBaseChars);
        const expectd = '6E';

        expect(actual).toBe(expectd);
    });

    it('converts 0 to the first char in given base chars', () => {
        const srcNum = 0;
        const destBaseChars = HEX_CHARS;
        const actual = convertFromBase10(srcNum, destBaseChars);
        const expectd = destBaseChars[0];

        expect(actual).toBe(expectd);
    });
});
