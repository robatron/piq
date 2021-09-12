import { getIntersectRect, Rect, Plot } from '../rectLove';

describe('Rect', () => {
    it('creates a rectangle from a size and bottom-left corner coordinate', () => {
        const plot: Plot = { size: [1, 1], startPos: [0, 0] };
        const rect = new Rect(plot);

        expect(rect.size).toStrictEqual({ height: 1, width: 1 });
        expect(rect.position).toStrictEqual({
            x: { start: 0, end: 1 },
            y: { start: 0, end: 1 },
        });
        expect(rect.getPlot()).toStrictEqual(plot);
    });
});

describe('getIntersectRect() finds the intersection rectangle of two rectangles', () => {
    /*let desc = 'overlap along both axes';
    let rect1 = { leftX: 1, bottomY: 1, width: 6, height: 3 };
    let rect2 = { leftX: 5, bottomY: 2, width: 3, height: 6 };
    let actual = findRectangularOverlap(rect1, rect2);
    let expected = { leftX: 5, bottomY: 2, width: 2, height: 2 };
    assertObjectEquals(actual, expected, desc);
    */
    it('overlapping on both axis', () => {
        const r1 = new Rect({ size: [3, 6], startPos: [1, 1] });
        const r2 = new Rect({ size: [6, 3], startPos: [5, 2] });
        const actual = getIntersectRect(r1, r2).getPlot();
        const expctd = { size: [2, 2], startPos: [5, 2] };
        expect(actual).toStrictEqual(expctd);
    });

    /*
    desc = 'one rectangle inside another';
    rect1 = { leftX: 1, bottomY: 1, width: 6, height: 6 };
    rect2 = { leftX: 3, bottomY: 3, width: 2, height: 2 };
    actual = findRectangularOverlap(rect1, rect2);
    expected = { leftX: 3, bottomY: 3, width: 2, height: 2 };
    assertObjectEquals(actual, expected, desc);
    */
    it('one completely inside the other', () => {
        const r1 = new Rect({ size: [6, 6], startPos: [1, 1] });
        const r2 = new Rect({ size: [2, 2], startPos: [3, 3] });
        const actual = getIntersectRect(r1, r2).getPlot();
        const expctd = { size: [2, 2], startPos: [3, 3] };
        expect(actual).toStrictEqual(expctd);
    });

    /*
    desc = 'both rectangles the same';
    rect1 = { leftX: 2, bottomY: 2, width: 4, height: 4 };
    rect2 = { leftX: 2, bottomY: 2, width: 4, height: 4 };
    actual = findRectangularOverlap(rect1, rect2);
    expected = { leftX: 2, bottomY: 2, width: 4, height: 4 };
    assertObjectEquals(actual, expected, desc);
    */
    it('both rectangles the same', () => {
        const r1 = new Rect({ size: [4, 4], startPos: [2, 2] });
        const r2 = new Rect({ size: [4, 4], startPos: [2, 2] });
        const actual = getIntersectRect(r1, r2).getPlot();
        const expctd = { size: [4, 4], startPos: [2, 2] };
        expect(actual).toStrictEqual(expctd);
    });

    /*
    desc = 'touch on horizontal edge';
    rect1 = { leftX: 1, bottomY: 2, width: 3, height: 4 };
    rect2 = { leftX: 2, bottomY: 6, width: 2, height: 2 };
    actual = findRectangularOverlap(rect1, rect2);
    expected = { leftX: null, bottomY: null, width: null, height: null };
    assertObjectEquals(actual, expected, desc);
    */
    it('touch on the horizontal edge', () => {
        const r1 = new Rect({ size: [4, 3], startPos: [1, 2] });
        const r2 = new Rect({ size: [2, 2], startPos: [2, 6] });
        const actual = getIntersectRect(r1, r2).getPlot();
        const expctd = { size: [0, 2], startPos: [2, 6] };
        expect(actual).toStrictEqual(expctd);
    });

    /*
    desc = 'touch on vertical edge';
    rect1 = { leftX: 1, bottomY: 2, width: 3, height: 4 };
    rect2 = { leftX: 4, bottomY: 3, width: 2, height: 2 };
    actual = findRectangularOverlap(rect1, rect2);
    expected = { leftX: null, bottomY: null, width: null, height: null };
    assertObjectEquals(actual, expected, desc);
    */
    it('touch on the vertical edge', () => {
        const r1 = new Rect({ size: [4, 3], startPos: [1, 2] });
        const r2 = new Rect({ size: [2, 2], startPos: [4, 3] });
        const actual = getIntersectRect(r1, r2).getPlot();
        const expctd = { size: [2, 0], startPos: [4, 3] };
        expect(actual).toStrictEqual(expctd);
    });

    /*
    desc = 'touch at a corner';
    rect1 = { leftX: 1, bottomY: 1, width: 2, height: 2 };
    rect2 = { leftX: 3, bottomY: 3, width: 2, height: 2 };
    actual = findRectangularOverlap(rect1, rect2);
    expected = { leftX: null, bottomY: null, width: null, height: null };
    assertObjectEquals(actual, expected, desc);
    */
    it('touch at corner', () => {
        const r1 = new Rect({ size: [2, 2], startPos: [1, 1] });
        const r2 = new Rect({ size: [2, 2], startPos: [3, 3] });
        const actual = getIntersectRect(r1, r2).getPlot();
        const expctd = { size: [0, 0], startPos: [3, 3] };
        expect(actual).toStrictEqual(expctd);
    });

    /*
    desc = 'no overlap';
    rect1 = { leftX: 1, bottomY: 1, width: 2, height: 2 };
    rect2 = { leftX: 4, bottomY: 6, width: 3, height: 6 };
    actual = findRectangularOverlap(rect1, rect2);
    expected = { leftX: null, bottomY: null, width: null, height: null };
    assertObjectEquals(actual, expected, desc);
    */
    it('returns null if no overlap', () => {
        const r1 = new Rect({ size: [3, 6], startPos: [1, 1] });
        const r2 = new Rect({ size: [6, 3], startPos: [4, 6] });
        const actual = getIntersectRect(r1, r2);
        expect(actual).toBeNull();
    });
});
