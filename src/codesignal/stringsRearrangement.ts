function stringsRearrangement(inputArray) {
    const solution = [];
    let ret = false;

    function checkSolution() {
        for (let i = 0; i < solution.length - 1; i++) {
            let diff = 0;
            for (let j = 0; j < solution[i].length; j++) {
                if (solution[i][j] !== solution[i + 1][j]) {
                    diff++;
                }
            }
            if (diff !== 1) {
                return false;
            }
        }
        return true;
    }

    function bt() {
        for (let i = 0; i < inputArray.length; i++) {
            if (ret) {
                break;
            }

            solution.push(inputArray.splice(i, 1)[0]);

            if (inputArray.length === 0) {
                ret = ret || checkSolution();
            } else {
                bt();
            }

            inputArray.splice(i, 0, solution.pop());
        }
    }

    bt();

    return ret;
}

// -----

Object.keys(
    'r/learnjavascript'.split('').reduce(
        (acc, e) => (
            // What is this ??
            (acc[e] = true), acc
        ),
        {},
    ),
).length;

(acc, e) => {
    acc[e] = true;
    return acc;
};

(acc, e) => ({ ...acc, [e]: true });
