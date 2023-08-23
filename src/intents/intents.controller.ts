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

  @Post('')
  @UseGuards(JwtAuthGuard)
  async intent(@Body() body: any, @Request() request: any) {
    return this.intentsService.processIntent(body.data);
  }

  @Post('/gpt')
  @UseGuards(JwtAuthGuard)
  async intentGPT(@Body() body) {
    return this.gptService.fromGPT(body.message);
  }

  @Post('/text')
  async intentText(@Body() body) {
    return this.intentsService.getIntent(body.intent);
  }
}
