const Adapter = require('../dist')
const low = require('lowdb')

let adapter = new Adapter(
  { bucket: 'stackerror', key: 'example.json' },
  { region: 'us-east-1' },
  { mergeState: false }
)

async function init() {
  // low(adapter) must be awaited because calling low() performs an initial read
  let db = await low(adapter)

  db.defaults({ posts: [], user: {} })
    .write()

  for (let i = 0; i < 5; i++) {
   db.get('posts')
    .push({ counter: i })
    .write()
  }

  let state = await db.get('posts').value()
  console.log(state)  
  await db.set('posts', []).write()
  state = await db.get('posts').value()
  console.log(state)  
  // => [ { id: 1, title: 'lowdb is awesome' } ]
}

init()