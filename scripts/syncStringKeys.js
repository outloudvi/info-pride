#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

function isPlainObject(v) {
    return v && typeof v === 'object' && !Array.isArray(v);
}

function syncKeys(src, tgt, stats = { added: 0, removed: 0 }) {
    // add keys from src that are missing in tgt
    for (const key of Object.keys(src)) {
        if (!(key in tgt)) {
            tgt[key] = src[key];
            stats.added++;
        } else if (isPlainObject(src[key]) && isPlainObject(tgt[key])) {
            syncKeys(src[key], tgt[key], stats);
        }
    }

    // remove keys from tgt that are missing in src
    for (const key of Object.keys(tgt)) {
        if (!(key in src)) {
            delete tgt[key];
            stats.removed++;
        } else if (isPlainObject(tgt[key]) && isPlainObject(src[key])) {
            // already handled in the add pass, but ensure nested removals are counted
            // by recursing into nested objects (no-op if identical)
            syncKeys(src[key], tgt[key], stats);
        }
    }

    return stats;
}

async function main() {
    const [, , file1, file2] = process.argv;

    if (!file1 || !file2) {
        console.error('Usage: node sync-json-keys.js <file1.json> <file2.json>');
        process.exit(2);
    }

    try {
        const [raw1, raw2] = await Promise.all([
            fs.readFile(path.resolve(file1), 'utf8'),
            fs.readFile(path.resolve(file2), 'utf8'),
        ]);

        let json1, json2;
        try {
            json1 = JSON.parse(raw1);
        } catch (e) {
            console.error(`Failed to parse ${file1} as JSON:`, e.message);
            process.exit(3);
        }
        try {
            json2 = JSON.parse(raw2);
        } catch (e) {
            console.error(`Failed to parse ${file2} as JSON:`, e.message);
            process.exit(3);
        }

        if (!isPlainObject(json1) || !isPlainObject(json2)) {
            console.error('Both JSON files must contain top-level objects.');
            process.exit(4);
        }

        const stats = syncKeys(json1, json2, { added: 0, removed: 0 });

        await fs.writeFile(path.resolve(file2), JSON.stringify(json2, null, 4) + '\n', 'utf8');

        console.log(`Synced keys. Added: ${stats.added}, Removed: ${stats.removed}`);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

if (require.main === module) main();