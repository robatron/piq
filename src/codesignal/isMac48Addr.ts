const SEP = '-';
const HEX_CHARS: Set<string> = new Set(
    Array(16)
        .fill(0)
        .map((_, i) => i.toString(16).toUpperCase()),
);
const VALID_MAC_LEN = 6 * 3 - 1;

const isMAC48Address = (str: string): boolean => {
    if (str.length !== VALID_MAC_LEN) {
        return false;
    }

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const shouldBeHexChar: boolean = i % 3 !== 2;
        const isHexChar = HEX_CHARS.has(char);
        const isSepChar = char === SEP;
        const isValidChar = shouldBeHexChar ? isHexChar : isSepChar;

        if (!isValidChar) {
            return false;
        }
    }

    return true;
};

export default isMAC48Address;
