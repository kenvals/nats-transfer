import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class WriterConsumerService {
  logger = new Logger('WriterConsumerService')
  write(notice, chunks) {
    const { data } = chunks
    const { uuid, len, offset } = notice

    const path = '/Users/kenval/Desktop/temp'
    const file = `${path}/${uuid}.png`
    try {
      if (!fs.existsSync(file)) {
        const fd = fs.openSync(file, 'w')
        fs.close(fd)
      }
      //file exists
      const buffer = Buffer.from(data)
      const fd = fs.openSync(file, 'r+')
      fs.writeSync(fd, buffer, 0, len, offset)
      fs.close(fd)
    } catch (e) {
      console.log('error', e)
      this.logger.error(e)
    }
  }
}
