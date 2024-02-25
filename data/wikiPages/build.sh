#!/bin/bash
set -eu

pushd $(dirname $0)
node -r esbuild-register $PWD/fetch.ts

echo "{\"updatedAt\":$(date +%s)}" >meta.json
