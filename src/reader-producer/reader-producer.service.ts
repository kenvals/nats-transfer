import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client, ClientProxy, Transport } from '@nestjs/microservices'
import * as fs from 'fs'

@Injectable()
export class ReaderProducerService {
  logger = new Logger('ReaderProducerService')
  constructor(private readonly configService: ConfigService) {}
  @Client({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_ADDR || 'nats://localhost:4222',
    },
  })
  client: ClientProxy
  async reader(file: any) {
    const supportedFiles = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp',
    ]
    // Проверяем поддержку типа файла
    if (!supportedFiles.includes(file.mimetype))
      return this.logger.warn(
        `Файл для загрузки не поддерживается! Тип: ${file.mimetype}`,
      )

    // Создаем чанки файла
    this.createChunk(file)

    return file
  }
  createChunk(file: any) {
    let currentChunk = 1

    const fileSize = file.size
    const fileType = file.mimetype
    const chunkSize = Number(this.configService.get<number>('MAX_PIPE'))
    const totalChunks = Math.ceil(fileSize / chunkSize)

    let notice = {}

    while (currentChunk <= totalChunks) {
      const offset = (currentChunk - 1) * chunkSize
      const sizeOffset=offset+chunkSize;
      const currentFilePart = Buffer.from(file.buffer).slice(
        offset,
        sizeOffset,
      )
      notice = { currentChunk, totalChunks, fileType, fileSize }

      console.log('***')
      console.log('offset:', offset)
      console.log('Current chunk:', currentChunk)
      console.log('Current chunk data', currentFilePart)

      this.producer(notice, currentFilePart)


      currentChunk++
    }
  }

  producer(_notice, _data) {
    this.client.emit('binary-data', { _notice, _data })
  }
}
