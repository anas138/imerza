import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AllMedia } from '../../allMedia/schema/allMedia.schema';
export type ImageCopiesDocument = ImageCopies & Document;
@Schema({ timestamps: true })
export class ImageCopies {
  @Prop()
  name: string;
  @Prop()
  image: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId , ref: 'AllMedia' })
  mediaId: AllMedia;
}

export const ImageCopiesSchema = SchemaFactory.createForClass(ImageCopies);
