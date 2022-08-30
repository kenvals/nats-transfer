import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
export declare class ReaderProducerService {
    private readonly configService;
    logger: Logger;
    constructor(configService: ConfigService);
    client: ClientProxy;
    reader(file: any): Promise<any>;
    createChunk(file: any): void;
    producer(_notice: any, _data: any): void;
}
