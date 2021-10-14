const electionsWinners = (votes: number[], k: number): number => {
    const max = Math.max(...votes);
    const numOfMax = votes.filter((v) => v === max).length;

    return votes.reduce((winnerCt, v) => {
        const isWinner = v === max && numOfMax === 1;
        const couldBeWinner = v + k > max;

        return winnerCt + Number(isWinner || couldBeWinner);
    }, 0);
};

export default electionsWinners;
