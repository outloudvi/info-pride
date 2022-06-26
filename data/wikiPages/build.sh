#!/bin/bash
set -eu

pushd $(dirname $0)
npm run dataset:ts $PWD/fetch.ts

echo "{\"updatedAt\":$(date +%s)}" >meta.json
