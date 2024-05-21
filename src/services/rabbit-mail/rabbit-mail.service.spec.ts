import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMailService } from './rabbit-mail.service';

describe('RabbitMailService', () => {
  let service: RabbitMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMailService],
    }).compile();

    service = module.get<RabbitMailService>(RabbitMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
