#!/bin/bash
set -eu

PAGES=(idols cards songs)

pushd $(dirname $0)

for key in "${PAGES[@]}"; do
    npm run dataset:ajv -- -s $PWD/$key.schema.json -d $PWD/$key.json
done
