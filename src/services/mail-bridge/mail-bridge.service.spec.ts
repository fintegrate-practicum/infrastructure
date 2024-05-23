import { Test, TestingModule } from '@nestjs/testing';
import { MailBridgeService } from './mail-bridge.service';

describe('MailBridgeService', () => {
  let service: MailBridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailBridgeService],
    }).compile();

    service = module.get<MailBridgeService>(MailBridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
