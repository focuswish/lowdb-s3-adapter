import Base from './Base'
import { Readable } from 'stream'

class Adapter extends Base {
  async read() {
    try {
      let data = await this.source.get().text()
      return data ? this.deserialize(data) : this.defaultValue
      
    } catch(e) {
      let stream = new Readable
      stream.push(this.serialize(this.defaultValue))
      stream.push(null)
      
      await this.source.streamUpload(stream).promise()

      return this.defaultValue
    }
  }

  async write(data) {
    return this.graceful.write(this.serialize(data))   
  }
}

export default Adapter
module.exports = Adapter;