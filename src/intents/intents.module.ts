import { Module } from '@nestjs/common';
import { IntentsService } from './intents.service';
import { IntentsController } from './intents.controller';
import { VoicetotextModule } from 'src/voicetotext/voicetotext.module';
import { GptModule } from 'src/gpt/gpt.module';
import { MailModule } from 'src/mail/mail.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  providers: [IntentsService],
  controllers: [IntentsController],
  imports: [VoicetotextModule, GptModule, MailModule, SettingsModule],
})
export class IntentsModule {}
