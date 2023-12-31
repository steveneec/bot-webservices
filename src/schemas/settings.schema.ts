import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SettingsDocument = HydratedDocument<Settings>;

@Schema()
export class Settings {
  @Prop()
  email: string;
  @Prop()
  emailKey: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
