import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user.schema';
import { SettingsModule } from 'src/settings/settings.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    SettingsModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
