/*
A crack team of love scientists from OkEros (a hot new dating site) have devised
a way to represent dating profiles as rectangles on a two-dimensional plane.

They need help writing an algorithm to find the intersection of two users' love
rectangles. They suspect finding that intersection is the key to a matching
algorithm so powerful it will cause an immediate acquisition by Google or
Facebook or Obama or something.

<Image: Two rectangles overlapping a little. It must be love.>

Write a function to find the rectangular intersection of two given love
rectangles.

As with the example above, love rectangles are always "straight" and never
"diagonal." More rigorously: each side is parallel with either the x-axis or the
y-axis.

They are defined as objects like this:

```js
const myRectangle = {
    // Coordinates of bottom-left corner
    leftX: 1,
    bottomY: 1,

    // Width and height
    width: 6,
    height: 3,
};
```

Your output rectangle should use this format as well.

https://www.interviewcake.com/question/javascript/rectangular-love?course=fc1&section=general-programming
*/
type Height = number;
type Width = number;
type XPoint = number;
type YPoint = number;

// Size of a rectangle
export type Size = {
    height: Height;
    width: Width;
};

// Position of a rectangle
export type Position = {
    x: {
        start: number;
        end: number;
    };
    y: {
        start: number;
        end: number;
    };
};

// Shorthand for a rectangle's size and starting position
export type Plot = { size: [Height, Width]; startPos: [XPoint, YPoint] };

// Class describing the size and coordinates of a "love rectangle"
export class Rect {
    position: Position;
    size: Size;

    constructor({ size, startPos }: Plot) {
        const [xStart, yStart] = startPos;
        const [height, width] = size;

        this.position = {
            x: {
                start: xStart,
                end: xStart + width,
            },
            y: {
                start: yStart,
                end: yStart + height,
            },
        };
        this.size = { height, width };
    }

    // Get the bottom-left corner point and size of this rectangle
    getPlot = (): Plot => {
        const { x, y } = this.position;
        const { height, width } = this.size;

        return {
            startPos: [x.start, y.start],
            size: [height, width],
        };
    };
}

// Get the size and position of the given dimention
const getRangeOverlap = (
    r1: Rect,
    r2: Rect,
    d: string,
): { startPoint: number; size: number } => {
    // The highest start point is the start of the overlap, and the
    // lowest end point is the end of the overlap
    const maxStartPoint = Math.max(r1.position[d].start, r2.position[d].start);
    const minEndPoint = Math.min(r1.position[d].end, r2.position[d].end);

    // Calculate the overlap for this dimension
    const overlap = minEndPoint - maxStartPoint;

    // An intersection rectangle requires an overlap in all dimensions
    // so immediately return null if any are missing
    if (overlap < 0) {
        return null;
    }

    return {
        startPoint: maxStartPoint,
        size: overlap,
    };
};

export const getIntersectRect = (r1: Rect, r2: Rect): Rect => {
    // Find the start points and sizes of the overlap in both dimensions
    const [xOverlap, yOverlap] = ['x', 'y'].map((dimension) =>
        getRangeOverlap(r1, r2, dimension),
    );

    // An intersection rectangle requires an overlap in both dimensions
    // so immediately return null if any are missing
    if (!xOverlap || !yOverlap) {
        return null;
    }

    // Return the resulting intersection rectangle
    return new Rect({
        startPos: [xOverlap.startPoint, yOverlap.startPoint],
        size: [yOverlap.size, xOverlap.size],
    });
};
