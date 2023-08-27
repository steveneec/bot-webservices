import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop()
  name: string;
  @Prop({ unique: true })
  email: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
