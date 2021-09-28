import { dieOf5 } from '../dieOf5Sides';

test('log rand5()', () => {
    const randMax = 5;
    const sampleCount = 100000;
    const counts: number[] = Array(randMax).fill(0);

    for (let i = 0; i < sampleCount; i++) {
        const r5 = dieOf5();
        counts[r5 - 1]++;
    }

    console.log(`dieOf5 tally for ${sampleCount} rolls:`, counts);

    // Each count should be roughly 1/5th to indicate an even distribution
    counts.forEach((count) => {
        const compareMult = 100;
        const expctd = Math.round((1 / randMax) * compareMult);
        const actual = Math.round((count / sampleCount) * compareMult);

        expect([expctd - 1, expctd, expctd + 1]).toContain(actual);
    });
});
