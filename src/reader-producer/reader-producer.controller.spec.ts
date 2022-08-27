import { Test, TestingModule } from '@nestjs/testing';
import { ReaderProducerController } from './reader-producer.controller';

describe('ReaderProducerController', () => {
  let controller: ReaderProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReaderProducerController],
    }).compile();

    controller = module.get<ReaderProducerController>(ReaderProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
