"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterConsumerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const writer_consumer_controller_1 = require("./writer-consumer.controller");
const writer_consumer_service_1 = require("./writer-consumer.service");
let WriterConsumerModule = class WriterConsumerModule {
};
WriterConsumerModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        controllers: [writer_consumer_controller_1.WriterConsumerController],
        providers: [writer_consumer_service_1.WriterConsumerService],
    })
], WriterConsumerModule);
exports.WriterConsumerModule = WriterConsumerModule;
//# sourceMappingURL=writer-consumer.module.js.map