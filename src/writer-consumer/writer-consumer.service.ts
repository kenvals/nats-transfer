import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class WriterConsumerService {
  write(notice, chunks) {
    let { totalChunks, currentChunk } = notice
    const { data } = chunks

    fs.writeFile(
      '/Users/kenval/Desktop/temp/image.png',
      Buffer.from(data),
      () => console.log('saved chunks!'),
    )
  }
}
