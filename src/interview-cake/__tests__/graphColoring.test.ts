import colorGraph, { isGraphLegallyColored } from '../graphColoring';
import GraphNode from '../lib/GraphNode';

describe('isGraphLegallyColored', () => {
    // Example graphs from
    // https://www.interviewcake.com/concept/javascript/graph-coloring

    it('returns true if a graph is legally colored', () => {
        const a = new GraphNode('a');
        const b = new GraphNode('b');
        const c = new GraphNode('c');
        const d = new GraphNode('d');
        const e = new GraphNode('e');
        const f = new GraphNode('f');

        a.neighbors.add(c);
        a.neighbors.add(d);
        b.neighbors.add(c);
        b.neighbors.add(e);
        c.neighbors.add(a);
        c.neighbors.add(b);
        c.neighbors.add(d);
        c.neighbors.add(f);
        d.neighbors.add(a);
        d.neighbors.add(c);
        d.neighbors.add(f);
        e.neighbors.add(b);
        e.neighbors.add(f);
        f.neighbors.add(c);
        f.neighbors.add(d);
        f.neighbors.add(e);

        a.color = 0;
        b.color = 0;
        c.color = 1;
        d.color = 2;
        e.color = 2;
        f.color = 0;

        const graph = [a, b, c, d, e, f];

        expect(isGraphLegallyColored(graph)).toBe(true);
    });

    it('returns false if a graph is not legally colored', () => {
        const a = new GraphNode('a');
        const b = new GraphNode('b');
        const c = new GraphNode('c');
        const d = new GraphNode('d');
        const e = new GraphNode('e');
        const f = new GraphNode('f');

        a.neighbors.add(c);
        a.neighbors.add(d);
        b.neighbors.add(c);
        b.neighbors.add(e);
        c.neighbors.add(a);
        c.neighbors.add(b);
        c.neighbors.add(d);
        c.neighbors.add(f);
        d.neighbors.add(a);
        d.neighbors.add(c);
        d.neighbors.add(f);
        e.neighbors.add(b);
        e.neighbors.add(f);
        f.neighbors.add(c);
        f.neighbors.add(d);
        f.neighbors.add(e);

        // a and c are neighbors but are also the same color
        a.color = 1;
        b.color = 0;
        c.color = 1;
        d.color = 2;
        e.color = 2;
        f.color = 0;

        const graph = [a, b, c, d, e, f];

        expect(isGraphLegallyColored(graph)).toBe(false);
    });
});

describe('colorGraph', () => {
    it('colors all the nodes of a simple graph', () => {
        const a = new GraphNode('a');
        const b = new GraphNode('b');
        const c = new GraphNode('c');

        a.neighbors.add(b);
        b.neighbors.add(a);
        c.neighbors.add(b);
        b.neighbors.add(c);

        const graph = [a, b, c];

        colorGraph(graph);

        expect(isGraphLegallyColored(graph)).toBe(true);
    });

    it('colors all the nodes of a complex graph', () => {
        const a = new GraphNode('a');
        const b = new GraphNode('b');
        const c = new GraphNode('c');
        const d = new GraphNode('d');
        const e = new GraphNode('e');
        const f = new GraphNode('f');

        a.neighbors.add(c);
        a.neighbors.add(d);
        b.neighbors.add(c);
        b.neighbors.add(e);
        c.neighbors.add(a);
        c.neighbors.add(b);
        c.neighbors.add(d);
        c.neighbors.add(f);
        d.neighbors.add(a);
        d.neighbors.add(c);
        d.neighbors.add(f);
        e.neighbors.add(b);
        e.neighbors.add(f);
        f.neighbors.add(c);
        f.neighbors.add(d);
        f.neighbors.add(e);

        const graph = [a, b, c, d, e, f];

        colorGraph(graph);

        expect(isGraphLegallyColored(graph)).toBe(true);
    });
});
