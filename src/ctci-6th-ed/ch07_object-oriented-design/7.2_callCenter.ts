/**
 * 7.2 - Call center
 *
 * Imagine you have a call center with three levels of employees:
 *
 *  1. respondent
 *  2. manager
 *  3. director
 *
 * An incoming telephone call must be first allocated to a respondent who is
 * free. If the respondent can't handle the call, he or she must escalate the
 * call to a manager. If the manager is not free or not able to handle it, then
 * the call should be escalated to a director. Design the classes and data
 * structures for this problem.
 *
 * Implement a method dispatchCall() which assigns a call to the first
 * available employee.
 *
 * Notes:
 *  - A CallCenter has many directors
 *  - A director has many managers and/or respondents
 *  - A manager has many respondents
 *
 * TODO: Finish this!
 */

// Call center "call"
class Call {
    lifespan: number;

    constructor(lifespan = 1) {
        this.lifespan = lifespan;
    }
}

// Possible employee roles and their numerical levels
enum Role {
    respondent = 0,
    manager = 1,
    director = 2,
}

// Call center employee
class Employee {
    activeCall: Call;
    name: string;
    reports: Employee[];
    role: Role;

    constructor(role: Role, reports: Employee[], name?: string) {
        this.activeCall = null;
        this.reports = reports;
        this.role = role;

        // If no name is supplied, assign a random 5-digit ID
        this.name = name || String(Math.round(Math.random() * 100000));
    }

    /**
     * Advance time by one tick for this employee and all of their reports
     */
    // advanceTime(): void {}

    /**
     * Ask this employee to choose and return report to assign a call to. Find
     * and return the lowest-level available report. If none are available,
     * return this themselves. If no one in this org tree is available, return
     * null.
     */
    chooseAssignee(): Employee {
        let assignee = null;

        // Find and set the lowest-level available report
        this.reports.forEach((report) => {
            if (
                assignee === null ||
                (!report.activeCall && report.role < assignee.role)
            ) {
                assignee = report;
            }
        });

        // If no reports are available, choose themselves as the assignee
        if (assignee === null && this.activeCall) {
            assignee = this;
        }

        return assignee;
    }

    // Make this employee take this call
    takeCall(call: Call) {
        this.activeCall = call;
    }
}

// class CallCenter {
//     // Employees at the call center are arranged as a tree with the root
//     // employee being the highest-level boss
//     private topDog: Employee;

//     constructor(rootEmployee: Employee) {
//         this.topDog = rootEmployee;
//     }

//     // Assign a call to the first available, lowest-level employee
//     dispachCall() {
//         const assignee = this.topDog.chooseAssignee();
//     }

//     // Advance the world time by one tick
//     advanceTime() {
//         this.topDog.advanceTime();
//     }
// }

export { Employee };
