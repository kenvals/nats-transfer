import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class WriterConsumerService {
    private readonly configService;
    constructor(configService: ConfigService);
    logger: Logger;
    write(notice: any, chunks: any): void;
}
