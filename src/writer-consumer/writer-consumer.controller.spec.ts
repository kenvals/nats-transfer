import { Test, TestingModule } from '@nestjs/testing';
import { WriterConsumerController } from './writer-consumer.controller';

describe('WriterConsumerController', () => {
  let controller: WriterConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WriterConsumerController],
    }).compile();

    controller = module.get<WriterConsumerController>(WriterConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
