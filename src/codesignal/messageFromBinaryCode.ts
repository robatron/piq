const messageFromBinaryCode = (code: string): string => {
    const decodedChars: string[] = [];
    let curCode: string = code.charAt(0);

    for (let i = 1; i < code.length; i++) {
        curCode += code.charAt(i);

        if (curCode.length === 8) {
            const charCode = parseInt(curCode, 2);
            const decodedChar = String.fromCharCode(charCode);
            decodedChars.push(decodedChar);
            curCode = '';
        }
    }

    return decodedChars.join('');
};

export default messageFromBinaryCode;
