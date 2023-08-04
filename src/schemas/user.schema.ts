import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  birthday: Date;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ default: false })
  verified: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
