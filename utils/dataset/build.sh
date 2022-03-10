#!/bin/bash

declare -A PAGES

PAGES['calendar']="模块:日历数据"
PAGES['notemap']="模块:歌谱数据"
PAGES['diary']="模块:麻奈日记数据"

for key in "${!PAGES[@]}"; do
    curl "https://wiki.biligame.com/idolypride/api.php?action=query&format=json&prop=revisions&list=&titles=${PAGES[$key]}&formatversion=1&rvslots=main&rvprop=ids%7Ctimestamp%7Ccontent" -o $key.origin.json
    lua ./tojson.lua ./$key.origin.json ./$key.json
done
