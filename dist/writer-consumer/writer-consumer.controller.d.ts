import { Logger } from '@nestjs/common';
import { WriterConsumerService } from './writer-consumer.service';
export declare class WriterConsumerController {
    private readonly writerConsumerService;
    constructor(writerConsumerService: WriterConsumerService);
    logger: Logger;
    consumer(payload: any): Promise<any>;
}
