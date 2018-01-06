# lowdb-s3-adapter

Lowdb adapter that uses AWS S3 as a store. 

Note: you must independently install aws-sdk and lowdb for this to work.

```bash
npm i lowdb aws-sdk lowdb-s3-adapter --save
```


## Usage
```
let Adapter = require('lowdb-s3-adapter')

// S3 bucket name, key (file), tags, etc. Arguments are passed to s3.upload()

let params = {
  bucket: 'stackerror',
  key: 'data.json'
}

// passed to AWS constructor
let config = { region: 'us-east-1' }

let adapter = Adapter(params, config)
let db = low(adapter)
```
## Example

```js
const Adapter = require('lowdb-s3-adapter')
const low = require('lowdb')

let adapter = new Adapter({bucket: 'stackerror', key: 'data.json'})

function init() {
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
  // =>   [ { id: 1, title: 'lowdb is awesome' } ]
}

init()
```