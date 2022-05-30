#!/bin/bash
set -eu

pushd $(dirname $0)

node ./build.mjs
echo "{\"updatedAt\":$(date +%s)}" >meta.json
