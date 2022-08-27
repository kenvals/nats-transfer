import { Body, Controller, Logger, Post } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { WriterConsumerService } from './writer-consumer.service'

@Controller('writer-consumer')
export class WriterConsumerController {
  constructor(private readonly writerConsumerService: WriterConsumerService) {}
  logger = new Logger('WriterConsumerService')
  @EventPattern('binary-data')
  consumer(@Payload() payload: any) {
    const { _notice, _data } = payload
    this.logger.debug(
      `<-- Файл пришел в Consumer. Chunk: ${_notice.currentChunk}/${_notice.totalChunks} Размер чанка: ${_data.data.length} bytes. File: ${_notice.uuid}`,
    )
    this.writerConsumerService.write(_notice, _data)

    return payload
  }
}
