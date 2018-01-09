import Tools from 's3-tools/dist/Tools'
import graceful from 'graceful-s3';

interface Base {
  source: any,
  defaultValue: any,
  serialize: any,
  deserialize: any
  fs: any
}

class Base {
  constructor(
    params = {},
    AwsConfig = {},
    { 
      defaultValue = {}, 
      serialize = obj => JSON.stringify(obj, null, 2),
      deserialize = JSON.parse 
    } = {}
  ) {
    this.source = new Tools(params, AwsConfig)
    this.defaultValue = defaultValue
    this.serialize = serialize
    this.deserialize = deserialize
    this.fs = graceful(params, AwsConfig)
  }
}

export default Base;