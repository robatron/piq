import { dieOf7 } from '../dieOf7Sides';

test('log dieOf7()', () => {
    const roll = dieOf7();
    console.log(roll);
    expect(typeof roll).toBe('number');
});

test('dieOf7() distribution', () => {
    const randMax = 7;
    const sampleCount = 100000;
    const counts: number[] = Array(randMax).fill(0);

    for (let i = 0; i < sampleCount; i++) {
        const r7 = dieOf7();
        counts[r7 - 1]++;
    }

    console.log(`dieOf7 tally for ${sampleCount} rolls:`, counts);

    // Each count should be roughly 1/7th to indicate an even distribution
    counts.forEach((count) => {
        const compareMult = 100;
        const expctd = Math.round((1 / randMax) * compareMult);
        const actual = Math.round((count / sampleCount) * compareMult);

        expect([expctd - 1, expctd, expctd + 1]).toContain(actual);
    });
});
