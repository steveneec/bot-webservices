import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDTO } from 'src/dto/user.dtos';
import { EncryptHelper } from 'src/helpers/EncryptHelper';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly settingsService: SettingsService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    //Encrypt password
    const _encPassword = await EncryptHelper.encryptString(
      createUserDTO.password,
    );
    //Replace original password
    createUserDTO.password = _encPassword;
    //Create user on db
    const user = await this.userModel.create(createUserDTO);
    await this.settingsService.createSettings(user._id.toString());
    return user._id;
  }
  async getUser(email: string) {
    return this.userModel.findOne({ email });
  }
}
