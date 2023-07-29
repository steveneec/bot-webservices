import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child-process-async';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const { stdout, stderr } = await exec(
      'python src/python/scripts/whisper.py',
    );
    return stdout;
  }
}
