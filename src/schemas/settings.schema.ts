import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type SettingsDocument = HydratedDocument<Settings>;

@Schema()
export class Settings {
  @Prop()
  gptAPIKey: string;
  @Prop()
  mailSMTP: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
