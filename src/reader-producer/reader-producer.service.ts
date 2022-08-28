import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client, ClientProxy, Transport } from '@nestjs/microservices'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

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
      'text/plain'
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
    const chunkSize = (this.configService.get<number>('MAX_CHUNK'))
    const totalChunks = Math.ceil(fileSize / chunkSize)
    const uuid = uuidv4()

    let notice = {}

    while (currentChunk <= totalChunks) {
      const offset = (currentChunk - 1) * chunkSize
      const sizeOffset = offset + chunkSize
      const currentFilePart = Buffer.from(file.buffer).slice(offset, sizeOffset)
      const len = currentFilePart.length
      notice = {
        currentChunk,
        totalChunks,
        len,
        fileType,
        fileSize,
        uuid,
        offset,
      }

      this.producer(notice, currentFilePart)

      currentChunk++
    }
  }

  producer(_notice, _data) {
    this.logger.debug(
      `--> Чанк отправлен в Producer. Chunk: ${_notice.currentChunk}/${_notice.totalChunks} Размер чанка: ${_data.length} bytes. File: ${_notice.uuid}`,
    )
    this.client.emit('binary-data', { _notice, _data })
  }
}
