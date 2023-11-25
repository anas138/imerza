import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type RolesDocument = Roles & Document;

@Schema({ timestamps: true })
export class Roles {
  @Prop()
  name: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
