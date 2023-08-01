import { Test, TestingModule } from '@nestjs/testing';
import { VoicetotextController } from './voicetotext.controller';

describe('VoicetotextController', () => {
  let controller: VoicetotextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoicetotextController],
    }).compile();

    controller = module.get<VoicetotextController>(VoicetotextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
