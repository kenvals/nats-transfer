import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_ADDR || 'nats://localhost:4222',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
