#!/bin/bash
set -eu

pushd $(dirname $0)
source ../data/parts.env
pushd ../data/

for mod in "${COMPONENTS[@]}"; do
    pushd ./$mod
    if [ "${VALIDATE_ONLY:-n}" != "y" ]; then
        ./build.sh
    fi
    ./validate.sh
    popd
done
