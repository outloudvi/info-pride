#!/bin/bash
set -eu

pushd $(dirname $0)
npm run dataset:ts $PWD/fetch.ts
npm run dataset:ts $PWD/parseCard.ts

echo "{\"updatedAt\":$(date +%s)}" >meta.json
