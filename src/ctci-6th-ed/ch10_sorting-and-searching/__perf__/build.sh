#! /bin/bash

set -e
set -x

npx tsc --moduleResolution node --module es6 --outDir __build__/ ../10.3_searchInRotatedArray.ts
