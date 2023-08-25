import { Injectable } from '@nestjs/common';
import { GptService } from 'src/gpt/gpt.service';
import { VoicetotextService } from 'src/voicetotext/voicetotext.service';
import { exec } from 'child-process-async';
import axios from 'axios';

@Injectable()
export class IntentsService {
  constructor(
    private readonly voicetotextService: VoicetotextService,
    private readonly gptService: GptService,
  ) {}

  async getIntent(text: string) {
    const command = `python src/python/scripts/intents.py ${text}`;
    const { stdout, stderr } = await exec(command);
    return stdout;
  }

  async getYoutubeUrl(query: string) {
    /*const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&type=video&key=${process.env.YOUTUBEAPIKEY}`,
    );*/

    //return response.data.items[0].id.videoId;
    return 'ERMXXIN3UQM';
  }
}
