import meshMessage from '../meshMessage';

const DEFAULT_NETWORK = {
    Min: ['William', 'Jayden', 'Omar'],
    William: ['Min', 'Noam'],
    Jayden: ['Min', 'Amelia', 'Ren', 'Noam'],
    Ren: ['Jayden', 'Omar'],
    Amelia: ['Jayden', 'Adam', 'Miguel'],
    Adam: ['Amelia', 'Miguel'],
    Miguel: ['Amelia', 'Adam'],
    Noam: ['Jayden', 'William'],
    Omar: ['Ren', 'Min'],
};

it('returns the shortest route between two users', () => {
    expect(meshMessage(DEFAULT_NETWORK, 'Jayden', 'Ren')).toStrictEqual([
        'Jayden',
        'Ren',
    ]);
    expect(meshMessage(DEFAULT_NETWORK, 'Min', 'Amelia')).toStrictEqual([
        'Min',
        'Jayden',
        'Amelia',
    ]);
});

it('returns undefined if no path exists', () => {
    expect(meshMessage(DEFAULT_NETWORK, 'Min', 'Non-existent')).toBeUndefined();
});
