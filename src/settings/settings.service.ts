import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSettingsDTO } from 'src/dto/settings.dtos';
import { Settings } from 'src/schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private readonly settingsModel: Model<Settings>,
  ) {}

  async createSettings(user: string) {
    return await this.settingsModel.create({ user: user });
  }

  async updateSettings(updateSettings: UpdateSettingsDTO, user: string) {
    await this.settingsModel.findOneAndUpdate({ user: user }, updateSettings);
  }
}
