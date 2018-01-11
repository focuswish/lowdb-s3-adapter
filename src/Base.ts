import Tools from 's3-tools/dist/Tools'
import graceful from 'graceful-s3';

interface Base {
  source: any,
  defaultValue: any,
  serialize: any,
  deserialize: any
  graceful: any
}

class Base {
  constructor(
    params = {},
    AwsConfig = {},
    { 
      defaultValue = {}, 
      serialize = obj => JSON.stringify(obj, null, 2),
      deserialize = JSON.parse,
    } = {}
  ) {
    this.source = new Tools(params, AwsConfig)
    this.defaultValue = defaultValue
    this.serialize = serialize
    this.deserialize = deserialize
    this.graceful = graceful(
      params, 
      AwsConfig, { 
        defaultValue,
        serialize,
        deserialize
      }
    )
  }
}

export default Base;