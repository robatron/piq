/*
You decide to test if your oddly-mathematical heating company is fulfilling its
All-Time Max, Min, Mean and Mode Temperature Guarantee™.

Write a class TempTracker with these methods:

- Insert() — records a new temperature
- GetMax() — returns the highest temp we've seen so far
- GetMin() — returns the lowest temp we've seen so far
- GetMean() — returns the mean of all temps we've seen so far
- GetMode() — returns a mode of all temps we've seen so far

Optimize for space and time. Favor speeding up the getter methods GetMax(),
GetMin(), GetMean(), and GetMode() over speeding up the Insert() method.

GetMean() should return a double, but the rest of the getter methods can return
integers. Temperatures will all be inserted as integers. We'll record our
temperatures in Fahrenheit, so we can assume they'll all be in the range
0..110.

If there is more than one mode, return any of the modes.

https://www.interviewcake.com/question/csharp/temperature-tracker?course=fc1&section=general-programming
*/
type Temperature = number;
type TempOccurrences = number[];

export const DEFAULT_MIN_TEMP = 0;
export const DEFAULT_MAX_TEMP = 110;

export default class TempTracker {
    // Minimum and maximum possible temperatures
    _min: Temperature;
    _max: Temperature;

    // Highest and lowest inserted temps
    high: Temperature;
    low: Temperature;

    // Mean of the inserted temps
    mean: Temperature;
    _insertCount = 0;
    _sum = 0;

    // Mode of the inserted temps
    mode: Temperature;
    _occurrences: TempOccurrences;
    _maxOccurrence = 0;

    constructor({ min = DEFAULT_MIN_TEMP, max = DEFAULT_MAX_TEMP } = {}) {
        this._min = min;
        this._max = max;

        const range = max - min;

        if (range < 0) {
            throw new Error('Invalid range: max must be >= min');
        }

        this._occurrences = new Array(range + 1).fill(0);
    }

    // Record a new temperature. Return updated count for this temp.
    insert = (newTemp: Temperature): void => {
        if (newTemp < this._min || newTemp > this._max) {
            throw new Error(
                `New temperatures must be >= ${this._min} and <= ${this._max}`,
            );
        }

        // Update lowest and highest temps
        this.high = this.high ? Math.max(this.high, newTemp) : newTemp;
        this.low = this.low ? Math.min(this.low, newTemp) : newTemp;

        // Update the mean temp
        this._insertCount += 1;
        this._sum += newTemp;
        this.mean = this._sum / this._insertCount;

        // Update the mode temp
        const newTempNormalized = newTemp + this._min;
        if (!this._occurrences[newTempNormalized]) {
            this._occurrences[newTempNormalized] = 1;
        } else {
            this._occurrences[newTempNormalized] += 1;
        }

        if (this._occurrences[newTempNormalized] > this._maxOccurrence) {
            this.mode = newTemp;
            this._maxOccurrence = this._occurrences[newTempNormalized];
        }
    };
}
