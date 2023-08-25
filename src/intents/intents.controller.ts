import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IntentsService } from './intents.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GptService } from 'src/gpt/gpt.service';

@Controller('intents')
export class IntentsController {
  constructor(
    private readonly intentsService: IntentsService,
    private readonly gptService: GptService,
  ) {}

  @Post('/text')
  //@UseGuards(JwtAuthGuard)
  async intentGPT(@Body() body) {
    try {
      let intentResult = await this.intentsService.getIntent(body.message);
      intentResult = intentResult.trim();

      if (
        intentResult === 'takePhotoIntent' ||
        intentResult === 'takeSSIntent'
      ) {
        return { intent: intentResult.trim() };
      }

      const result = await this.gptService.fromGPT(body.message);

      if (result.function_call) {
        const jsonResult = {
          intent: result.function_call.name,
          params: JSON.parse(result.function_call.arguments),
        };

        if (jsonResult.intent === 'playVideo') {
          const videoId = await this.intentsService.getYoutubeUrl(
            jsonResult.params.query,
          );
          return { intent: jsonResult.intent, id: videoId };
        }

        if (jsonResult.intent === 'playMusic') {
          const videoId = await this.intentsService.getYoutubeUrl(
            jsonResult.params.title,
          );

          return {
            intent: jsonResult.intent,
            artist: jsonResult.params.artist,
            title: jsonResult.params.title,
            id: videoId,
          };
        }

        if (jsonResult.intent === 'moveIntent') {
          return {
            intent: jsonResult.intent,
            moveTo: jsonResult.params.moveTo,
          };
        }
      }

      return result;
    } catch (error) {
      console.log(error);
      return '_error';
    }
  }
}
