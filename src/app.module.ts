import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReaderProducerModule } from './reader-producer/reader-producer.module';
import { WriterConsumerModule } from './writer-consumer/writer-consumer.module';

@Module({
  imports: [ReaderProducerModule, WriterConsumerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
