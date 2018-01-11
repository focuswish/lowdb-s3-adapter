import Base from './Base'
import { Readable } from 'stream'

class Adapter extends Base {
  async read() {
    try {
      let data = await this.source.promisify('getObject')().text()
      return data ? this.deserialize(data) : this.defaultValue
      
    } catch(e) {
      let stream = new Readable
      stream.push(this.serialize(this.defaultValue))
      stream.push(null)
      
      await this.source.streamUpload(stream).data 

      return this.defaultValue
    }
  }

  async write(data) {
    this.graceful.write(this.serialize(data))

    return data;
   
  }
}

export default Adapter
module.exports = Adapter;