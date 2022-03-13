#!/bin/bash
set -eu

PARTS=(wikiModules wikiPages)

pushd $(dirname $0)

for mod in "${PARTS[@]}"; do
    pushd ./$mod
    ./build.sh
    ./validate.sh
    popd
done
