/*
You wrote a trendy new messaging app, MeshMessage, to get around flaky cell
phone coverage.

Instead of routing texts through cell towers, your app sends messages via the
phones of nearby users, passing each message along from one phone to the next
until it reaches the intended recipient. (Don't worry—the messages are encrypted
while they're in transit.)

Some friends have been using your service, and they're complaining that it takes
a long time for messages to get delivered. After some preliminary debugging, you
suspect messages might not be taking the most direct route from the sender to
the recipient.

Given information about active users on the network, find the shortest route for
a message from one user (the sender) to another (the recipient). Return an array
of users that make up this route.

There might be a few shortest delivery routes, all with the same length. For
now, let's just return any shortest route.

Your network information takes the form of an object where keys are usernames
and values are arrays of other users nearby:

    const network = {
        'Min'     : ['William', 'Jayden', 'Omar'],
        'William' : ['Min', 'Noam'],
        'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
        'Ren'     : ['Jayden', 'Omar'],
        'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
        'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
        'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
        'Noam'    : ['Nathan', 'Jayden', 'William'],
        'Omar'    : ['Ren', 'Min', 'Scott'],
        ...
    };

For the network above, a message from Jayden to Adam should have this route:

    ['Jayden', 'Amelia', 'Adam']

https://www.interviewcake.com/question/javascript/mesh-message?course=fc1&section=trees-graphs
*/

export default (
    network: Record<string, string[]>,
    sender: string,
    recipient: string,
): string[] => {
    const queue: string[] = [sender];
    const parents: Record<string, string> = { [sender]: null };

    // Traverse the network using BFS since BFS will always find the shortest
    // path to the recipient if there is one.
    while (queue.length) {
        const curUser = queue.pop();

        // Found it! Generate and return the path by walking through each
        // parent starting from the recipient.
        if (curUser === recipient) {
            const path: string[] = [recipient];
            let parent = parents[recipient];

            while (parent) {
                path.unshift(parent);
                parent = parent !== sender && parents[parent];
            }

            return path;
        }

        // For each neighbor, if it hasn't been seen, add it to the search queue
        // and keep track of its parent so we can generate the path later.
        network[curUser].forEach((neighbor) => {
            if (!Object.hasOwnProperty.call(parents, neighbor)) {
                queue.unshift(neighbor);
                parents[neighbor] = curUser;
            }
        });
    }
};
