/**
 * @lc app=leetcode id=1335 lang=typescript
 *
 * [1335] Minimum Difficulty of a Job Schedule
 *
 * https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/description/
 *
 * Hard (56.87%)
 *
 * You want to schedule a list of jobs in `d` days. Jobs are dependent (i.e To
 * work on the `i-th` job, you have to finish all the jobs `j` where `0 <= j <
 * i`).
 *
 * You have to finish at least one task every day. The _difficulty of a job
 * schedule_ is the sum of difficulties of each day of the `d` days. The
 * _difficulty of a day_ is the maximum difficulty of a job done in that day.
 *
 * Given an array of integers `jobDifficulty` and an integer `d`. The difficulty
 * of the `i-th` job is `jobDifficulty[i]`.
 *
 * Return the _minimum difficulty of a job schedule_. If you cannot find a
 * schedule for the jobs return -1.
 *
 * Example 1:
 *
 * - Input: jobDifficulty = [6,5,4,3,2,1], d = 2
 * - Output: 7
 * - Explanation:
 *   - First day you can finish the first 5 jobs, total difficulty = 6.
 *   - Second day you can finish the last job, total difficulty = 1.
 *   - The difficulty of the schedule = 6 + 1 = 7
 *
 * Example 2:
 *
 * - Input: jobDifficulty = [9,9,9], d = 4
 * - Output: -1
 * - Explanation: If you finish a job per day you will still have a free day, so
 *   you cannot find a schedule for the given jobs.
 *
 * Example 3:
 *
 * - Input: jobDifficulty = [1,1,1], d = 3
 * - Output: 3
 * - Explanation: The schedule is one job per day. total difficulty will be 3.
 *
 * Example 4:
 *
 * - Input: jobDifficulty = [7,1,7,1,7,1], d = 3
 * - Output: 15
 *
 * Example 5:
 *
 * - Input: jobDifficulty = [11,111,22,222,33,333,44,444], d = 6
 * - Output: 843
 *
 * Constraints:
 *
 * - 1 <= jobDifficulty.length <= 300
 * - 0 <= jobDifficulty[i] <= 1000
 * - 1 <= d <= 10
 */

// @lc code=start

/**
 * Recursive. Test every possible range of jobs for every day to find the
 * minimum schedule difficulty.
 *
 * - Time: O((d*(j-(d-1))^2)) = O((d*(j-d))^2) - For every day, we visit job
 *   count - (day count - 1), and for each visit, we recursively call the same
 *   thing again
 * - Space: O((d*(j-d))^2) - Same as time b/c space needed for stack
 */
const minDiffRecurs = (
    // Jobs and their difficulties
    jobs: number[],

    // Number of days in which we can do the jobs
    days: number,

    // Job to start with
    jobIdx = 0,
): number => {
    // Total number of jobs we have remaining
    const jobCt: number = jobs.length - jobIdx;

    // Max number of jobs we can do first day if we leave at least one job for
    // each remaining day
    const maxJobCtFirstDay: number = jobCt - (days - 1);

    // Base case: We must do at least one job per day, so we can't find a
    // schedule if there are more days than jobs
    if (days > jobCt) return -1;

    // Max job difficulties up to the specified job. (Use an object over an index
    // so we don't have to mess with index offsets or waste memory.)
    const maxJobDiffsUpTo: Record<number, number> = {
        [jobIdx]: jobs[jobIdx],
    };
    for (let i = jobIdx + 1; i < jobs.length; i++) {
        const maxJobDiff: number = maxJobDiffsUpTo[i - 1];
        maxJobDiffsUpTo[i] = jobs[i] > maxJobDiff ? jobs[i] : maxJobDiff;
    }

    // Base case: If there's only one day to do all the jobs, the max possible
    // schedule difficulty is just the max difficulty of the remaining jobs
    if (days === 1) return maxJobDiffsUpTo[jobs.length - 1];

    // Consider every job we can do first day: Start by taking the 1st job, then
    // the 1st and 2nd, then 1st, 2nd, and 3rd, etc., continually updating the
    // min schedule difficulty.
    let minSchedDifficulty = Infinity;
    for (let i = jobIdx; i < jobIdx + maxJobCtFirstDay; i++) {
        const curSchedDifficulty: number =
            maxJobDiffsUpTo[i] + minDiffRecurs(jobs, days - 1, i + 1);
        if (curSchedDifficulty < minSchedDifficulty)
            minSchedDifficulty = curSchedDifficulty;
    }

    // Return the minimum possible schedule difficulty
    return minSchedDifficulty;
};

/**
 * Dynamic programming (bottom-up). Find the min difficulties of the schedule if
 * we were to start with each job on the last day, then the min difficulties of
 * the schedule if we were to preceed with each possible job on the penultimate
 * day, etc.
 *
 * - Time: O(number of states * runtime of recurrence function)
 *     = O(d*(n-d) * O(r)) = O(d*(n-d) * (n-d)/2) = O(d*(n-d)^2)
 * - Space: O(number of states) = O(d*(n-d))
 */
const minDiffDP = (jobs: number[], days: number): number => {
    // Base case: We must do at least one job per day, so we can't find a
    // schedule if there are more days than jobs
    if (days > jobs.length) return -1;

    // Final day, final job index, and final job difficulty
    const lastDay: number = days;
    const lastJobIdx: number = jobs.length - 1;
    const lastJobDiff: number = jobs[lastJobIdx];

    // Maintain the min schedule difficulties if we were to start with a given
    // job on a given day. If we were to start on the last job on the last day,
    // the min schedule difficulty would just be the final job's difficulty.
    const minSchedDiffs: Record<number, Record<number, number>> = {
        [lastJobIdx]: { [lastDay]: lastJobDiff },
    };

    // Base cases: On the final day, we must do all remaining jobs so the min
    // schedule difficulty is the most difficult job from the given job to the
    // final job
    for (let job = lastJobIdx - 1; job >= 0; job--) {
        const nextMaxJobDiff = minSchedDiffs[job + 1][lastDay];
        minSchedDiffs[job] = { [lastDay]: Math.max(nextMaxJobDiff, jobs[job]) };
    }

    // Consider each job we can do on each day starting with the penultimate day
    for (let day = days - 1; day >= 1; day--) {
        const jobStartIdx: number = day - 1;
        const jobEndIdx: number = lastJobIdx - (days - day);

        for (let job = jobStartIdx; job <= jobEndIdx; job++) {
            let hardest = 0;

            // Consider the min schedule difficulties if we were to start on
            // each job we can do this day. Would the schedule difficulty be
            // smaller if we started on the current job, or starting on the next
            // job on the next day (adding the most difficult job we've seen so
            // far in this range)?
            for (let i = job; i <= jobEndIdx; i++) {
                // Most difficult job we can do this day we've seen so far
                hardest = Math.max(hardest, jobs[i]);

                // Min sched difficulty if we were to start on this job this day
                const curSchedDiff: number = minSchedDiffs[job][day];

                // Min sched difficulty if we were to start on the next
                // job on the next day (including this day's most difficult job)
                const nextSchedDiff = hardest + minSchedDiffs[i + 1][day + 1];

                // Update the min sched difficulty starting on this job this day
                if (curSchedDiff === undefined || nextSchedDiff < curSchedDiff)
                    minSchedDiffs[job][day] = nextSchedDiff;
            }
        }
    }

    // Return the minimum schedule difficulty if we started on job 0 on day 1
    return minSchedDiffs[0][1];
};

// Which function shall we enable for LeetCode?
const minDifficulty = minDiffDP;

// @lc code=end

export { minDifficulty, minDiffRecurs, minDiffDP };
