import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReaderProducerController } from './reader-producer.controller';
import { ReaderProducerService } from './reader-producer.service';

@Module({
  imports:[ConfigModule.forRoot()],
  controllers: [ReaderProducerController],
  providers: [ReaderProducerService],
})
export class ReaderProducerModule {}
