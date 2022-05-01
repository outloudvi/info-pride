#!/bin/bash
set -eu

pushd $(dirname $0)
source ../data/parts.env
pushd ../data/

for mod in "${PARTS[@]}"; do
    node ./schemaToType.mjs $mod
done
