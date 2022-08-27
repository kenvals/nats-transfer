import { Test, TestingModule } from '@nestjs/testing';
import { ReaderProducerService } from './reader-producer.service';

describe('ReaderProducerService', () => {
  let service: ReaderProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReaderProducerService],
    }).compile();

    service = module.get<ReaderProducerService>(ReaderProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
