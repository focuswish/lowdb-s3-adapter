# lowdb-s3-adapter

[Lowdb adapter](https://github.com/typicode/lowdb) that uses AWS S3 as a store. 

Note: you must independently install aws-sdk and lowdb.

```bash
npm i lowdb aws-sdk lowdb-s3-adapter --save
```

## Usage

```js
let Adapter = require('lowdb-s3-adapter')
let adapter = new Adapter(params, AwsConfig, lowdbOpts)
```

### Arguments
#### `params` (required)

- S3 bucket name, key (file), tags, etc. 
- Arguments are passed to s3.upload()
- use camel case ('bucket' instead of 'Bucket', 'key' instead of 'Key', etc.)
- default = {}

**Example**
```
let params = {
  bucket: 'stackerror',
  key: 'data.json'
}
```

#### `AwsConfig` (optional)
 - passed to AWS constructor 
 - here's what's happening under the hood: `let s3 = new AWS.S3(AwsConfig)`
 - default: { region: 'us-east-1' }

**Example**
let AwsConfig = { region: 'us-east-2' }

#### `lowdbOpts` (optional)
  - defaults to: 
```
 default = { 
   defaultValue = {}, 
   serialize = obj => JSON.stringify(obj, null, 2),
   deserialize = JSON.parse 
 }
```

## Examples

```js
const Adapter = require('lowdb-s3-adapter')
const low = require('lowdb')

let adapter = new Adapter(
  { bucket: 'stackerror', key: 'data.json' },
  { region: 'us-east-1' }
)

async function init() {
  // low(adapter) must be awaited because calling low() performs an initial read
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
  // => [ { id: 1, title: 'lowdb is awesome' } ]
}

init()