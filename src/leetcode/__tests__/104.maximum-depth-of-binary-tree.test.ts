import { maxDepth, TreeNode } from '../104.maximum-depth-of-binary-tree';
import { createTests } from './utils';

const tn = (
    val: number = null,
    left: TreeNode = null,
    right: TreeNode = null,
) => new TreeNode(val, left, right);

createTests(
    [
        // Examples
        [tn(3, tn(9, null, null), tn(20, tn(15), tn(7))), 3],
        [tn(1, null, tn(2)), 2],
    ],
    maxDepth,
    {
        maxInputDisplayLen: 25,
    },
);
