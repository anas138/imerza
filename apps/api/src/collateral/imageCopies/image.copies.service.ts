import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageCopies, ImageCopiesDocument } from './schema/image.copies.schema';

@Injectable()
export class ImageCopiesService {
  constructor(
    @InjectModel(ImageCopies.name)
    private imageCopies: Model<ImageCopiesDocument>,
  ) {}
  async addImageCopies(data) {
    const schema = new this.imageCopies(data);
    const ImageCopies = await schema.save();
    if (ImageCopies) {
      return ImageCopies;
    }
  }
}
