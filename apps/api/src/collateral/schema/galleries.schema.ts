import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AllMedia } from '../allMedia/schema/allMedia.schema';
import { Auth } from '../auth/schema/auth.schema';
export type GalleryDocument = Gallery & Document;
@Schema({timestamps:true})
export class Gallery {
  @Prop()
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId,ref:"Auth"})
  user: Auth;
  @Prop()
  project: string;
  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId}],ref:"AllMedia"})
  images:AllMedia[]
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
