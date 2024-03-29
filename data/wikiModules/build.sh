#!/bin/bash
set -eu

declare -A PAGES

PAGES['calendar']="模块:日历数据"

pushd $(dirname $0)

for key in "${!PAGES[@]}"; do
    curl "https://wiki.biligame.com/idolypride/api.php?action=query&format=json&prop=revisions&list=&titles=${PAGES[$key]}&formatversion=1&rvslots=main&rvprop=ids%7Ctimestamp%7Ccontent" -o $key.origin.json
    lua ./tojson.lua ./$key.origin.json ./$key.json
done

echo "{\"updatedAt\":$(date +%s)}" >meta.json
