#!/bin/bash
set -eu

PARTS=(wikiModules wikiPages vendor)

pushd $(dirname $0)

for mod in "${PARTS[@]}"; do
    node ./schemaToType.mjs $mod
done
