const bishopAndPawn = (bishop: string, pawn: string): boolean => {
    // Convert a given string position to a number position with which we can
    // compare, e.g., 'a'=97, 'b'=98, ... and '1'=1, '2'=2, ...
    const getPosX = (s: string): number => s[0].charCodeAt(0);
    const getPosY = (s: string): number => parseInt(s[1]);

    // Grab the difference in horizontal and vertical distances
    const xDist: number = Math.abs(getPosX(bishop) - getPosX(pawn));
    const yDist: number = Math.abs(getPosY(bishop) - getPosY(pawn));

    // The bishop can capture the pawn if it is a diagonal distance away!
    return xDist === yDist;
};

export { bishopAndPawn };
