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
exports.WriterConsumerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
let WriterConsumerService = class WriterConsumerService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger("WriterConsumerService");
    }
    write(notice, chunks) {
        const { data } = chunks;
        const { uuid, len, offset } = notice;
        const path = this.configService.get("GARBAGE_PATH");
        fs.stat(path, function (err) {
            if (err) {
                fs.mkdir(path, (err) => {
                    if (err)
                        throw err;
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
            const buffer = Buffer.from(data);
            const fd = fs.openSync(file, "r+");
            fs.writeSync(fd, buffer, 0, len, offset);
            fs.close(fd);
        }
        catch (e) {
            this.logger.error(e);
        }
    }
};
WriterConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WriterConsumerService);
exports.WriterConsumerService = WriterConsumerService;
//# sourceMappingURL=writer-consumer.service.js.map