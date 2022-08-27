import {
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReaderProducerService } from './reader-producer.service';

@Controller('reader-producer')
export class ReaderProducerController {
  constructor(private readonly readerProducerService: ReaderProducerService) {}
  logger = new Logger('ReaderProducer');

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    //Загружаем файл по HTTP, чтобы начать процесс Producer NATS
    this.readerProducerService.reader(file);
    return 'ok';
  }
}
