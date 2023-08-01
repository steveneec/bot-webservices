import { Test, TestingModule } from '@nestjs/testing';
import { VoicetotextService } from './voicetotext.service';

describe('VoicetotextService', () => {
  let service: VoicetotextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoicetotextService],
    }).compile();

    service = module.get<VoicetotextService>(VoicetotextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
