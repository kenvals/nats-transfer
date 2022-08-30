"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderProducerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const uuid_1 = require("uuid");
let ReaderProducerService = class ReaderProducerService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger('ReaderProducerService');
    }
    async reader(file) {
        const supportedFiles = [
            'image/gif',
            'image/jpeg',
            'image/png',
            'image/webp',
            'text/plain'
        ];
        if (!supportedFiles.includes(file.mimetype))
            return this.logger.warn(`Файл для загрузки не поддерживается! Тип: ${file.mimetype}`);
        this.createChunk(file);
        return file;
    }
    createChunk(file) {
        let currentChunk = 1;
        const fileSize = file.size;
        const fileType = file.mimetype;
        const chunkSize = (this.configService.get('MAX_CHUNK'));
        const totalChunks = Math.ceil(fileSize / chunkSize);
        const uuid = (0, uuid_1.v4)();
        let notice = {};
        while (currentChunk <= totalChunks) {
            const offset = (currentChunk - 1) * chunkSize;
            const sizeOffset = offset + chunkSize;
            const currentFilePart = Buffer.from(file.buffer).slice(offset, sizeOffset);
            const len = currentFilePart.length;
            notice = {
                currentChunk,
                totalChunks,
                len,
                fileType,
                fileSize,
                uuid,
                offset,
            };
            this.producer(notice, currentFilePart);
            currentChunk++;
        }
    }
    producer(_notice, _data) {
        this.logger.debug(`--> Чанк отправлен в Producer. Chunk: ${_notice.currentChunk}/${_notice.totalChunks} Размер чанка: ${_data.length} bytes. File: ${_notice.uuid}`);
        this.client.emit('binary-data', { _notice, _data });
    }
};
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.NATS,
        options: {
            url: process.env.NATS_ADDR || 'nats://localhost:4222',
        },
    }),
    __metadata("design:type", microservices_1.ClientProxy)
], ReaderProducerService.prototype, "client", void 0);
ReaderProducerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ReaderProducerService);
exports.ReaderProducerService = ReaderProducerService;
//# sourceMappingURL=reader-producer.service.js.map