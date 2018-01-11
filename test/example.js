const Adapter = require('../dist')
const low = require('lowdb')

let adapter = new Adapter(
  { bucket: 'stackerror', key: 'example.json' },
  { region: 'us-east-1' }
)

async function init() {
  // low(adapter) must be awaited because calling low() performs an initial read
  let db = await low(adapter)

  db.defaults({ posts: [], user: {} })
    .write()

  db.get('posts')
    .push({ id: 1, title: 'lowdb is awesome'})
    .write()

  db.set('user.name', 'typicode')
    .write()

  let state = db.get('posts').value()
  console.log(state)
  // => [ { id: 1, title: 'lowdb is awesome' } ]
}

init()