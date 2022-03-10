#!/bin/bash

PAGES=(calendar diary notemap)

for key in "${PAGES[@]}"; do
    npm run dataset:ajv -- -s $PWD/$key.schema.json -d $PWD/$key.json
done
