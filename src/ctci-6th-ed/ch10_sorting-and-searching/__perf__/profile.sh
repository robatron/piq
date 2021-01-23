#! /bin/bash

set -e
set -x

npx 0x -o --output-dir __build__/{timestamp}.0x 10.3_searchInRotatedArray.perf.js
