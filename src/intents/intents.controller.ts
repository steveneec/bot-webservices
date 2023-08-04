import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IntentsService } from './intents.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('intents')
export class IntentsController {
  constructor(private readonly intentsService: IntentsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async intent(@Body() body: any, @Request() request: any) {
    return this.intentsService.processIntent(body.data);
  }
}
