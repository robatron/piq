const longestWord = (text: string): string =>
    text
        .match(/[a-zA-Z]+/g)
        .reduce((longWord, word) =>
            word.length > longWord.length ? word : longWord,
        );
