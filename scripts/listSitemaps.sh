#!/bin/bash
set -eu

BASEURL="https://ip.outv.im"

cd $(dirname $0)

echo '<?xml version="1.0" encoding="UTF-8"?>'
echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
for i in $(ls ../app/sitemaps); do
    echo "  <sitemap>"
    echo "    <loc>${BASEURL}/sitemaps/${i}/sitemap.xml</loc>"
    echo "  </sitemap>"
done
echo "</sitemapindex>"
