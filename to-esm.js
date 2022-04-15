const fs = require('fs')

const pak = fs.readFileSync('./package.json', 'utf-8')
pak.type = 'module'
fs.writeFileSync('./package.json', JSON.stringify(pak))
