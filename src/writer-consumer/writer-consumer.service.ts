import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class WriterConsumerService {
  async write(notice, data) {
    console.log(data);
    const buffer = Buffer.from(data.data);
    console.log(buffer);
    // console.log(data.data);
    // const id: string = uuid();
    // fs.writeFile(
    //   '/Users/kenval/Desktop/R-vision/data/image.txt',
    //   Buffer.from(data.data),
    //   'binary',
    // );
  }
}
