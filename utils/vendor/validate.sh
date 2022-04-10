#!/bin/bash
set -eu

PARTS=(storiesTitle)

pushd $(dirname $0)

for key in "${PARTS[@]}"; do
    npm run dataset:ajv -- -s $PWD/$key.schema.json -d $PWD/$key.json
done
