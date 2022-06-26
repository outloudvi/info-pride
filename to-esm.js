const fs = require('fs')

function writeTo(obj, file) {
  const pak = JSON.parse(fs.readFileSync(file, 'utf-8'))
  fs.writeFileSync(
    file,
    JSON.stringify({
      ...pak,
      ...obj,
    })
  )
}

writeTo(
  {
    type: 'module',
  },
  './package.json'
)

writeTo(
  {
    'ts-node': {
      esm: true,
    },
  },
  './tsconfig.json'
)
