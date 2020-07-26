import { URLIfy } from '../1.3_URLify';

describe('URLIfy', () => {
    it('replaces spaces with the string %20', () => {
        const tstStrArr = 'Mr John Smith'.split('');
        const expectedResult = 'Mr%20John%20Smith'.split('');
        URLIfy(tstStrArr);
        expect(tstStrArr).toEqual(expectedResult);
    });

    it('handles empty strings', () => {
        const tstStrArr = ''.split('');
        URLIfy(tstStrArr);
        expect(tstStrArr).toEqual([]);
    });

    it('handles strings with no spaces', () => {
        const tstStrArr = 'Supercalifragilisticexpialidocious'.split('');
        const expectedResult = [...tstStrArr]; // Copy of original
        URLIfy(tstStrArr);
        expect(tstStrArr).toEqual(expectedResult);
    });
});
