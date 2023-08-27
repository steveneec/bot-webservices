import {
  Controller,
  Body,
  Request,
  UseGuards,
  Post,
  HttpException,
  HttpStatus,
  Patch,
  Get,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDTO } from 'src/dto/settings.dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateContactDTO } from 'src/dto/contact.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Patch('update-settings')
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

  @Post('/new-contact')
  @UseGuards(JwtAuthGuard)
  async createContact(
    @Body() createContactDTO: CreateContactDTO,
    @Request() request: any,
  ) {
    const result = await this.settingsService.addContact(
      createContactDTO,
      request.user.id,
    );

    if (!result) {
      throw new HttpException(
        { message: 'The contact with this name already exists!' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  @Get('/contacts/all')
  @UseGuards(JwtAuthGuard)
  async getAllContacts(@Request() request: any) {
    return await this.settingsService.getAllContacts(request.user.id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getSettings(@Request() request: any) {
    return await this.settingsService.getSettings(request.user.id);
  }
}
