import { Module } from '@nestjs/common';
import { VoicetotextController } from './voicetotext.controller';
import { VoicetotextService } from './voicetotext.service';

@Module({
  controllers: [VoicetotextController],
  providers: [VoicetotextService]
})
export class VoicetotextModule {}
