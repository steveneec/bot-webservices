import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoicetotextModule } from './voicetotext/voicetotext.module';

@Module({
  imports: [VoicetotextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
