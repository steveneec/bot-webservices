import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoicetotextModule } from './voicetotext/voicetotext.module';
import { IntentsModule } from './intents/intents.module';
import { ChatModule } from './chat/chat.module';
import { GptModule } from './gpt/gpt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE),
    VoicetotextModule,
    IntentsModule,
    ChatModule,
    GptModule,
    SettingsModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
