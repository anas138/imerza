import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllMediaDocument, AllMedia } from './schema/allMedia.schema';
import { AllMediaDto } from './dto/allMedia.dto';
import { ColletralService } from '../collateral.service';
@Injectable()
export class AllMediaService {
  constructor(
    @InjectModel(AllMedia.name) private allMediaModel: Model<AllMediaDocument>,
    @Inject(forwardRef(() => ColletralService))
    private readonly collateralServices: ColletralService,
  ) {}
  async saveImages(
    imageUrl: any,
    id: any,
    user: any,
    projectRoot: string,
    name: string,
  ) {
    const data = {
      image: imageUrl,
      name: name,
      galleryId: id,
      user: user,
      active: true,
      project: projectRoot,
    };
    const model = await new this.allMediaModel(data);
    const media = await model.save();
    if (media) {
      return media;
    }
  }
  async getAllImages(id: string) {
    const response = await this.allMediaModel.find({ project: id });
    return response;
  }
  async getImageById(id) {
    const response = await this.allMediaModel.find(
      { galleryId: id },
      { image: 1 },
    );
    if (response) {
      return response;
    }
  }

  async updateSortedImages(data: any) {
    const id = data.map((d: any) => d._id);
    const del = await this.allMediaModel.deleteMany({ _id: id });
    if (del) {
      const updateInsert = await this.allMediaModel.insertMany([...data]);
      if (updateInsert) {
        return updateInsert;
      }
    }
  }

  async deleteMedia(id: string, galId: string) {
    const response = await this.collateralServices.RemoveMedia(galId, id);
    if (response) {
      return true;
    } else {
      return false;
    }
  }
  async referenceImage(data: any) {
    for (let i = 0; i < data.length; i++) {
      const id = data[i].id;
      await this.collateralServices.updateReferenceImages(
        data[i].galleryId,
        id,
      );
    }
    return 'images added';
  }
  async addImageCopies(data) {
    const updateImages = await this.allMediaModel.updateOne(
      { _id: data.mediaId },
      { $push: { image: data.image } },
    );
    if (updateImages) {
      return 'added successfully';
    }
  }
  async renameMedia(id: string, name: string) {
    const update = await this.allMediaModel.updateOne({_id:id},{$set:{name:name}})
  }
}
