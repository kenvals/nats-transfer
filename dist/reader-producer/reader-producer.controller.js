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
exports.ReaderProducerController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const reader_producer_service_1 = require("./reader-producer.service");
let ReaderProducerController = class ReaderProducerController {
    constructor(readerProducerService) {
        this.readerProducerService = readerProducerService;
        this.logger = new common_1.Logger('ReaderProducer');
    }
    uploadFile(file) {
        console.log(file);
        this.readerProducerService.reader(file);
        return 'ok';
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReaderProducerController.prototype, "uploadFile", null);
ReaderProducerController = __decorate([
    (0, common_1.Controller)('reader-producer'),
    __metadata("design:paramtypes", [reader_producer_service_1.ReaderProducerService])
], ReaderProducerController);
exports.ReaderProducerController = ReaderProducerController;
//# sourceMappingURL=reader-producer.controller.js.map