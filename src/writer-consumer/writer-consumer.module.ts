import { Module } from '@nestjs/common';
import { WriterConsumerController } from './writer-consumer.controller';
import { WriterConsumerService } from './writer-consumer.service';

@Module({
  controllers: [WriterConsumerController],
  providers: [WriterConsumerService],
})
export class WriterConsumerModule {}
