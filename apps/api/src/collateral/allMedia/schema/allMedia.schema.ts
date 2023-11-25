import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Auth } from 'src/collateral/auth/schema/auth.schema';
export type AllMediaDocument = AllMedia & Document;

@Schema({ timestamps: true })
export class AllMedia {
  @Prop()
  image: [];
  @Prop()
  name: string;
  @Prop()
  active: boolean;
  @Prop()
  project: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  galleryId: [];
}

export const AllMediaSchema = SchemaFactory.createForClass(AllMedia);
