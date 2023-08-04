import { Module } from '@nestjs/common';
import { VoicetotextService } from './voicetotext.service';

@Module({
  providers: [VoicetotextService],
  exports: [VoicetotextService],
})
export class VoicetotextModule {}
