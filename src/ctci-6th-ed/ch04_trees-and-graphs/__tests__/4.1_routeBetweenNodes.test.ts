import { GraphNode } from '../GraphNode';
import { isRouteBetweenNodes } from '../4.1_routeBetweenNodes';

describe('isRouteBetweenNodes', () => {
    it('returns null if either node is null', () => {
        expect(isRouteBetweenNodes()).toBe(false);
        expect(isRouteBetweenNodes(new GraphNode(1))).toBe(false);
        expect(isRouteBetweenNodes(null, new GraphNode(1))).toBe(false);
    });

    describe('direct route', () => {
        it('returns true if there is a direct route A -> B', () => {
            const B = new GraphNode(2);
            const A = new GraphNode(1, [B]);

            const actual = isRouteBetweenNodes(A, B);

            expect(actual).toBe(true);
        });

        it.skip('returns true if there is a direct route B -> A', () => {
            const B = new GraphNode(2);
            const A = new GraphNode(1, [B]);

            const actual = isRouteBetweenNodes(B, A);

            expect(actual).toBe(true);
        });
    });

    describe('indirect route', () => {
        it('returns true if there is an indirect route A -> B', () => {
            const B = new GraphNode(3);
            const A = new GraphNode(1, [new GraphNode(2, [B])]);

            const actual = isRouteBetweenNodes(A, B);

            expect(actual).toBe(true);
        });
    });
});
