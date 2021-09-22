import TempTracker, { DEFAULT_MIN_TEMP, DEFAULT_MAX_TEMP } from '../tempTrack';

const CUSTOM_RANGE = { min: -3, max: 3000 };

describe('TempTracker', () => {
    describe('constructor', () => {
        it('creates a new temperature tracker with default min/max temps and empty stats', () => {
            const t = new TempTracker();
            expect(t._min).toBe(DEFAULT_MIN_TEMP);
            expect(t._max).toBe(DEFAULT_MAX_TEMP);
            [t.high, t.low, t.mean, t.mode].forEach((stat) => {
                expect(stat).toBeUndefined();
            });
        });

        it('creates a new temperature tracker with custom min/max temps', () => {
            const t = new TempTracker(CUSTOM_RANGE);
            expect(t._min).toBe(CUSTOM_RANGE.min);
            expect(t._max).toBe(CUSTOM_RANGE.max);
        });

        it('throws an error if the custom range is invalid', () => {
            const [min, max] = [DEFAULT_MAX_TEMP, DEFAULT_MIN_TEMP];
            expect(() => {
                new TempTracker({ min, max });
            }).toThrowErrorMatchingInlineSnapshot(
                `"Invalid range: max must be >= min"`,
            );
        });
    });

    describe('insert', () => {
        it('throws an error if the new temp is out of range', () => {
            const tDefault = new TempTracker();

            [DEFAULT_MIN_TEMP - 1, DEFAULT_MAX_TEMP + 1].forEach((badTemp) => {
                expect(() => {
                    tDefault.insert(badTemp);
                }).toThrow();
            });

            const tCustom = new TempTracker(CUSTOM_RANGE);

            [CUSTOM_RANGE.min - 1, CUSTOM_RANGE.max + 1].forEach((badTemp) => {
                expect(() => {
                    tCustom.insert(badTemp);
                }).toThrow();
            });
        });

        it('updates the high and low temps', () => {
            const t = new TempTracker();

            // Both high and low set to same temp on first insert
            t.insert(10);
            [t.high, t.low].forEach((stat) => {
                expect(stat).toBe(10);
            });

            // New high
            t.insert(20);
            expect(t.high).toBe(20);
            expect(t.low).toBe(10);

            // new low
            t.insert(5);
            expect(t.high).toBe(20);
            expect(t.low).toBe(5);
        });

        it('updates the mean temp', () => {
            const t = new TempTracker();

            t.insert(10);
            expect(t.mean).toBe(10);

            t.insert(20);
            expect(t.mean).toBe(15);

            t.insert(30);
            expect(t.mean).toBe(20);
        });

        describe('mode', () => {
            it('updates the mode temp', () => {
                const t = new TempTracker();

                // First insert becomes first mode
                t.insert(10);
                expect(t.mode).toBe(10);

                // 2nd insert equally as valid if it's unique
                t.insert(20);
                expect([10, 20]).toContain(t.mode);

                // 3rd insert takes over if it's the same as one of the other two
                t.insert(20);
                expect(t.mode).toBe(20);

                // 4th insert equally as valid if it's the same as the 1st
                t.insert(10);
                expect([10, 20]).toContain(t.mode);
            });

            it('updates the mode temp with a custom range', () => {
                const { min } = CUSTOM_RANGE;
                const mid = Math.floor(
                    (CUSTOM_RANGE.max - CUSTOM_RANGE.min) / 2,
                );
                const t = new TempTracker(CUSTOM_RANGE);

                t.insert(min);
                expect(t.mode).toBe(min);

                t.insert(mid);
                expect([min, mid]).toContain(t.mode);

                t.insert(mid);
                expect(t.mode).toBe(mid);
            });
        });

        describe('batch stats', () => {
            it('handles a single temp range', () => {
                const temp = 0;
                const t = new TempTracker({ min: temp, max: temp });

                for (let i = 0; i < 10; i++) {
                    t.insert(temp);
                    expect(t.high).toBe(temp);
                    expect(t.low).toBe(temp);
                    expect(t.mean).toBe(temp);
                    expect(t.mode).toBe(temp);
                }
            });

            // Sample tests from the question definition
            it('handles sample values', () => {
                const t = new TempTracker();

                // Step 1
                t.insert(50);
                expect(t.high).toBe(50);
                expect(t.low).toBe(50);
                expect(t.mean).toBe(50);
                expect(t.mode).toBe(50);

                // Step 2
                t.insert(80);
                expect(t.high).toBe(80);
                expect(t.low).toBe(50);
                expect(t.mean).toBe(65);
                expect(t.mode).toBe(50);

                // Step 3
                t.insert(80);
                expect(t.high).toBe(80);
                expect(t.low).toBe(50);
                expect(t.mean).toBe(70);
                expect(t.mode).toBe(80);

                // Step 4
                t.insert(30);
                expect(t.high).toBe(80);
                expect(t.low).toBe(30);
                expect(t.mean).toBe(60);
                expect(t.mode).toBe(80);
            });
        });
    });
});
