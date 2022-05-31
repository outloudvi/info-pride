#!/bin/bash
set -eu

pushd $(dirname $0)
source ../data/parts.env
pushd ../data/

for mod in "${COMPONENTS[@]}"; do
    node ../scripts/schemaToType.mjs $(realpath $mod)
done
