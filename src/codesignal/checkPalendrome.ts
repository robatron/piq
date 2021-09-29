// Return if a string is a palendrome or not
export const checkPalendrome = (palendrome: string): boolean => {
    let fwdPntr = 0;
    let bkwPntr = palendrome.length - 1;

    while (fwdPntr <= bkwPntr) {
        const fwdChar = palendrome.charAt(fwdPntr);
        const bkwChar = palendrome.charAt(bkwPntr);

        if (fwdChar != bkwChar) {
            return false;
        }

        fwdPntr++;
        bkwPntr--;
    }

    return true;
};
