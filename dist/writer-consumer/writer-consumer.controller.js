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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterConsumerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const writer_consumer_service_1 = require("./writer-consumer.service");
let WriterConsumerController = class WriterConsumerController {
    constructor(writerConsumerService) {
        this.writerConsumerService = writerConsumerService;
        this.logger = new common_1.Logger('WriterConsumerService');
    }
    async consumer(payload) {
        const { _notice, _data } = payload;
        this.logger.debug(`<-- Файл пришел в Consumer. Chunk: ${_notice.currentChunk}/${_notice.totalChunks} Размер чанка: ${_data.data.length} bytes. File: ${_notice.uuid}`);
        await this.writerConsumerService.write(_notice, _data);
        return payload;
    }
};
__decorate([
    (0, microservices_1.EventPattern)('binary-data'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WriterConsumerController.prototype, "consumer", null);
WriterConsumerController = __decorate([
    (0, common_1.Controller)('writer-consumer'),
    __metadata("design:paramtypes", [writer_consumer_service_1.WriterConsumerService])
], WriterConsumerController);
exports.WriterConsumerController = WriterConsumerController;
//# sourceMappingURL=writer-consumer.controller.js.map