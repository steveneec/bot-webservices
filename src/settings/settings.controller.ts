import { Controller, Body, Request, Put, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDTO } from 'src/dto/settings.dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Put('')
  @UseGuards(JwtAuthGuard)
  async updateSettings(
    @Body() updateSettingDTO: UpdateSettingsDTO,
    @Request() request: any,
  ) {
    return await this.settingsService.updateSettings(
      updateSettingDTO,
      request.user.id,
    );
  }
}
