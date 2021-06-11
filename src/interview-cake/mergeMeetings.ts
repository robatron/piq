/*
Your company built an in-house calendar tool called HiCal. You want to add a
feature to see the times in a day when everyone is available.

To do this, you’ll need to know when any team is having a meeting. In HiCal, a
meeting is stored as objects with integer properties startTime and endTime.
These integers represent the number of 30-minute blocks past 9:00am.

For example:

    { startTime: 2, endTime: 3 }  // meeting from 10:00 – 10:30 am
    { startTime: 6, endTime: 9 }  // meeting from 12:00 – 1:30 pm

Write a function mergeRanges() that takes an array of multiple meeting time
ranges and returns an array of condensed ranges.

For example, given:

  [
    { startTime: 0,  endTime: 1 },
    { startTime: 3,  endTime: 5 },
    { startTime: 4,  endTime: 8 },
    { startTime: 10, endTime: 12 },
    { startTime: 9,  endTime: 10 },
  ]

your function would return:

  [
    { startTime: 0, endTime: 1 },
    { startTime: 3, endTime: 8 },
    { startTime: 9, endTime: 12 },
  ]

Do not assume the meetings are in order. The meeting times are coming from
multiple teams.

Write a solution that's efficient even when we can't put a nice upper bound on
the numbers representing our time ranges. Here we've simplified our times down
to the number of 30-minute slots past 9:00 am. But we want the function to work
even for very large numbers, like Unix timestamps. In any case, the spirit of
the challenge is to merge meetings where startTime and endTime don't have an
upper bound.

Bonus:
    1. What if we did have an upper bound on the input values? Could we improve
       our runtime?
    2. Would it cost us memory? Could we do this "in place" on the input array
       and save some space? What are the pros and cons of doing this in place?

Notes:
    - [m1] [m2]       - n overlap
    - [m1 [ ] m2]     - m2 starts before m1 ends
    - [m2 [m1] m2]    - m1 starts and ends inside m2

https://www.interviewcake.com/question/javascript/merging-ranges
*/

export class Meeting {
    startTime: number;
    endTime: number;

    constructor(s: number, e: number) {
        this.startTime = s;
        this.endTime = e;
    }
}

// Merge meetings in O(n^2) time
export const mergeMeetingsNaiive = (meetings: Meeting[]): Meeting[] => {
    for (let i = 0; i < meetings.length; i++) {
        if (meetings[i]) {
            for (let ii = i + 1; ii < meetings.length; ii++) {
                // If meeting 1 ends after or at the same time as meeting 2
                // starts, they can be merged
                if (meetings[i].endTime >= meetings[ii].startTime) {
                    meetings[i] = new Meeting(
                        Math.min(meetings[i].startTime, meetings[ii].startTime),
                        Math.max(meetings[i].endTime, meetings[ii].endTime),
                    );
                    delete meetings[ii];
                }
            }
        }
    }

    return meetings.filter((m) => m);
};

// Merge meetings in O(n * lg(n)). Sort the meetings first by start time which
// takes O(n*lg(n)), then use a greedy algorithm comparing each meeting to its
// neighbor and merging if necessary which takes O(n)
export default (meetings: Meeting[]): Meeting[] => {
    const sortedMeetings: Meeting[] = [...meetings].sort(
        (a, b) => a.startTime - b.startTime,
    );
    const mergedMeetings: Meeting[] = [sortedMeetings[0]];

    for (let i = 1; i < meetings.length; i++) {
        const meeting = sortedMeetings[i];
        const lastMeeting = mergedMeetings[mergedMeetings.length - 1];

        if (meeting.startTime <= lastMeeting.endTime) {
            lastMeeting.endTime = Math.max(
                meeting.endTime,
                lastMeeting.endTime,
            );
        } else {
            mergedMeetings.push(meeting);
        }
    }

    return mergedMeetings;
};
