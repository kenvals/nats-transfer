import { Logger } from '@nestjs/common';
import { ReaderProducerService } from './reader-producer.service';
export declare class ReaderProducerController {
    private readonly readerProducerService;
    constructor(readerProducerService: ReaderProducerService);
    logger: Logger;
    uploadFile(file: any): string;
}
