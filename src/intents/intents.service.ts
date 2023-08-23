import { Injectable } from '@nestjs/common';
import { GptService } from 'src/gpt/gpt.service';
import { VoicetotextService } from 'src/voicetotext/voicetotext.service';
import { exec } from 'child-process-async';

@Injectable()
export class IntentsService {
  constructor(
    private readonly voicetotextService: VoicetotextService,
    private readonly gptService: GptService,
  ) {}

  async processIntent(data: string) {
    //Get Text from Audio data
    const audioText = await this.voicetotextService.getTextFromAudioBase64(
      data,
    );
    //Process audioText to get intent
    //this.gptService.fromGPT('', '');
    return audioText;
  }

  async getIntent(text: string) {
    const command = `python3 src/python/scripts/intents.py ${text}`;
    const { stdout, stderr } = await exec(command);
    return { stdout };
  }

  //useGPT
  //useLocalIntent
  //useInternetSearch
}
