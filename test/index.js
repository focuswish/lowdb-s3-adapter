const Adapter = require('../dist').default
const low = require('lowdb')

let adapter = new Adapter({bucket: 'stackerror', key: 'data.json'})

const log = (p) => p.then(d => console.log(d))

async function test() {
  const db = await low(adapter)
  await db.defaults({ posts: [], user: {} })
    .write()

  await db.get('posts').push({title: 'lorem', id: 123}).write()
  await db.get('posts').push({title: 'lorem', id: 123}).write()
  await db.get('posts').push({title: 'lorem', id: 123}).write()
  
  let out = await db.get('posts').value()
  console.log(out)
}


test()