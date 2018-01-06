const Adapter = require('../dist')
const low = require('lowdb')

let adapter = new Adapter({bucket: 'stackerror', key: 'data.json'})

async function init() {
  let db = await low(adapter)

  await db.defaults({ posts: [], user: {} })
    .write()

  await db.get('posts')
    .push({ id: 1, title: 'lowdb is awesome'})
    .write()

  await db.set('user.name', 'typicode')
    .write()

  let state = await db.get('posts').value()
  console.log(state)
}

init()