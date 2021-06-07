import mergeMeetings, { Meeting } from '../mergeMeetings';

describe('calendarMerge', () => {
    it('takes a list of meetings and returns a list of merged meetings', () => {
        const meetings = [
            new Meeting(0, 1),
            new Meeting(3, 5),
            new Meeting(4, 8),
            new Meeting(10, 12),
            new Meeting(9, 10),
        ];
        const expected = [
            new Meeting(0, 1),
            new Meeting(3, 8),
            new Meeting(9, 12),
        ];

        expect(mergeMeetings(meetings)).toStrictEqual(expected);
    });

    it('can handle fully-overlapping meetings', () => {
        const meetings = [
            new Meeting(0, 3),
            new Meeting(1, 2),
            new Meeting(5, 8),
            new Meeting(6, 7),
            new Meeting(10, 13),
            new Meeting(11, 12),
        ];
        const expected = [
            new Meeting(0, 3),
            new Meeting(5, 8),
            new Meeting(10, 13),
        ];

        expect(mergeMeetings(meetings)).toStrictEqual(expected);
    });

    it('can handle solid schedules', () => {
        const meetings = [
            new Meeting(1, 10),
            new Meeting(2, 6),
            new Meeting(3, 5),
            new Meeting(7, 9),
        ];
        const expected = [new Meeting(1, 10)];

        expect(mergeMeetings(meetings)).toStrictEqual(expected);
    });
});
