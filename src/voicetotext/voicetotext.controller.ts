import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VoicetotextService } from './voicetotext.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('voicetotext')
export class VoicetotextController {
  constructor(private readonly voicetotextService: VoicetotextService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file', { dest: 'temp' }))
  async getTextFromVoice(@UploadedFile() file: Express.Multer.File) {
    return this.voicetotextService.getTextFromAudio(file);
  }
}
