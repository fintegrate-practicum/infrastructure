import { Test, TestingModule } from '@nestjs/testing';
import { RabbitConsumerService } from './rabbit-consumer.service';

describe('RabbitConsumerService', () => {
  let service: RabbitConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitConsumerService],
    }).compile();

    service = module.get<RabbitConsumerService>(RabbitConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
