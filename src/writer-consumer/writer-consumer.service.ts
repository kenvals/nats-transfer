import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { v4 as uuid } from "uuid";

@Injectable()
export class WriterConsumerService {
  constructor(private readonly configService: ConfigService) {}
  logger = new Logger("WriterConsumerService");
  write(notice, chunks) {
    const { data } = chunks;
    const { uuid, len, offset } = notice;

    const path = this.configService.get<string>("GARBAGE_PATH");

    fs.stat(path, function (err) {
      if (err) {
        fs.mkdir(path, (err) => {
          if (err) throw err;
          this.logger.error(err);
        });
      }
    });

    const fileType = notice.fileType.split("/")[1];

    const file = `${path}/${uuid}.${fileType}`;
    try {
      if (!fs.existsSync(file)) {
        const fd = fs.openSync(file, "w");
        fs.close(fd);
      }
      //file exists
      const buffer = Buffer.from(data);
      const fd = fs.openSync(file, "r+");
      fs.writeSync(fd, buffer, 0, len, offset);
      fs.close(fd);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
