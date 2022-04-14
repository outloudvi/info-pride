#!/bin/bash
set -eu

pushd $(dirname $0)
npm run tsn ./fetch.ts

echo "{\"updatedAt\":$(date +%s)}" >meta.json
