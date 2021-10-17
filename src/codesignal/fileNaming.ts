const fileNaming = (names: string[]): string[] => {
    const finalNames: string[] = [];
    const seenCounts: Record<string, number> = {};

    // Record that a file name has been seen
    const recordSeen = (name: string) => {
        if (!seenCounts[name]) {
            seenCounts[name] = 1;
        } else {
            seenCounts[name]++;
        }
    };

    // Get a new file name with "($SEEN_COUNT)" appended. If the new file name
    // has also been seen, increment $SEEN_COUNT until we have one that hasn't
    const getNextNewName = (name, seenCt) => {
        let nameNum = seenCt;
        let newName = `${name}(${nameNum})`;

        while (seenCounts[newName]) {
            nameNum++;
            newName = `${name}(${nameNum})`;
        }

        return newName;
    };

    // Update all the names
    for (let i = 0; i < names.length; i++) {
        const name: string = names[i];
        const seenCt: number = seenCounts[name] || 0;

        // First time seeing this name, so just pass it along as-is
        if (!seenCt) {
            finalNames.push(name);
        }

        // Otherwise, we've seen this name before. Get a new name, pass it
        // along, and record it as "seen"
        else {
            const newName = getNextNewName(name, seenCt);
            finalNames.push(newName);
            recordSeen(newName);
        }

        // Record the current name as "seen" regardless of how we processed it
        recordSeen(name);
    }

    return finalNames;
};

export default fileNaming;
