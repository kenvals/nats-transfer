import { Test, TestingModule } from '@nestjs/testing';
import { WriterConsumerService } from './writer-consumer.service';

describe('WriterConsumerService', () => {
  let service: WriterConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WriterConsumerService],
    }).compile();

    service = module.get<WriterConsumerService>(WriterConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
