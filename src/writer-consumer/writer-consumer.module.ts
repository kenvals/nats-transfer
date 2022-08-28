import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WriterConsumerController } from './writer-consumer.controller';
import { WriterConsumerService } from './writer-consumer.service';

@Module({
  imports:[ConfigModule.forRoot()],
  controllers: [WriterConsumerController],
  providers: [WriterConsumerService],
})
export class WriterConsumerModule {}
