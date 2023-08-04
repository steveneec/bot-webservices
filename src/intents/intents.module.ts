import { Module } from '@nestjs/common';
import { IntentsService } from './intents.service';
import { IntentsController } from './intents.controller';
import { VoicetotextModule } from 'src/voicetotext/voicetotext.module';
import { GptModule } from 'src/gpt/gpt.module';

@Module({
  providers: [IntentsService],
  controllers: [IntentsController],
  imports: [VoicetotextModule, GptModule],
})
export class IntentsModule {}
