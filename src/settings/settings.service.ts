import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDTO } from 'src/dto/contact.dto';
import { UpdateSettingsDTO } from 'src/dto/settings.dtos';
import { Contact } from 'src/schemas/contacts.schema';
import { Settings } from 'src/schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private readonly settingsModel: Model<Settings>,
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async createSettings(user: string) {
    return await this.settingsModel.create({ user: user });
  }

  async updateSettings(updateSettings: UpdateSettingsDTO, user: string) {
    await this.settingsModel.findOneAndUpdate({ user: user }, updateSettings);
  }

  async getContactByName(name: string, user: string) {
    return await this.contactModel.findOne({ name, user });
  }

  async getSettings(user: string) {
    return await this.settingsModel.findOne({ user });
  }

  async addContact(createContactDTO: CreateContactDTO, user: string) {
    createContactDTO.user = user; //add user owner

    //check if contact not exists
    const contact = await this.contactModel.findOne({
      name: createContactDTO.name,
      user: user,
    });

    if (contact) {
      return null;
    }

    return await this.contactModel.create(createContactDTO);
  }

  async getAllContacts(user: string) {
    return await this.contactModel.find({ user }).sort({ name: 'asc' });
  }
}
