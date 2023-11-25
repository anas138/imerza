import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './schema/galleries.schema';
import { AllMediaService } from './allMedia/allMedia.service';
import * as mongoose from 'mongoose';

@Injectable()
export class ColletralService {
  constructor(
    @InjectModel(Gallery.name) private galleyModel: Model<GalleryDocument>,
    @Inject(forwardRef(() => AllMediaService))
    private readonly allMediaService: AllMediaService,
  ) {}

  async createGallery(galleryData: any) {
    const model = await new this.galleyModel(galleryData);
    const gallery = model.save();
    if (gallery) {
      return gallery;
    }
  }

  async findAllGalleries(id: string) {
    const galleries = await this.galleyModel.find({ project: id });
    return galleries;
    //return this.galleyModel.find({}, { name: 1 });
  }

  async fingGallery(name) {
    const gallery = await this.galleyModel.findOne({ name: name });
    if (gallery) {
      return gallery;
    } else {
      return null;
    }
  }

  async fingGalleryById(id: string) {
    const gallery = await this.galleyModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'allmedias',
          as: 'media',
          localField: 'images',
          foreignField: '_id',
        },
      },
    ]);
    if (gallery) {
      return gallery;
    } else {
      return null;
    }
  }
  async galleryImages(galleryImages, id: string) {
    await this.galleyModel.updateOne(
      { _id: id },
      { $push: { images: galleryImages } },
    );
  }

  async findAllImages() {
    const response = await this.galleyModel.find({}, { images: 1 });
    if (response) {
      return response;
    }
  }
  async updateReferenceImages(id: string, imageId: string) {
    const findImage = await this.galleyModel.findOne({
      images: { $in: [imageId] },
      _id: id,
    });
    if (!findImage) {
      const response = await this.galleyModel.updateOne(
        { _id: id },
        { $push: { images: imageId } },
      );
      if (response) {
        return 'update';
      }
    }
  }
  async RemoveMedia(id: string, imageId: string) {
    const response = await this.galleyModel.updateOne(
      { _id: id },
      { $pull: { images: imageId } },
    );
    if (response) {
      return 'update';
    }
  }
  async updateSortedImages(data: any) {
    await this.galleyModel.updateOne({ _id: data._id }, { images: [] });
    const updateInsert = await this.galleyModel.updateOne(
      { _id: data._id },
      { $push: { images: data.state } },
    );
    return 'image sorted';

    // data.images.forEach(async (img: any) => {
    //   const updateInsert = await this.galleyModel.updateOne(
    //     { _id: data._id },
    //     { $push: { images: img } },
    //   );
    //   if (updateInsert) {
    //     return 'images sorted';
    //   }
    // });
  }

  async deleteGallery(id: string) {
    const del = await this.galleyModel.deleteOne({ _id: id });
    if (del) {
      return 'gallery delete successfully';
    }
  }

  async generateJson(project: string) {
    const query = await this.galleyModel.aggregate([
      {
        $lookup: {
          from: 'allmedias',
          as: 'images',
          localField: 'images',
          foreignField: '_id',
        },
      },
      {
        $lookup: {
          from: 'auths',
          as: 'user',
          let: { role: '$user' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$projectId', project] }],
                },
              },
            },
          ],
        },
      },
      { $match: { user: { $ne: [] } } },
    ]);
    // jSONS
    let appJson = {
      config: {
        customer: '',
        project_name: '',
        project_location: '',
        map_type: 'image',
        lat_long: '',
        asset_location: '',
        project_logo: '',
        images_location: '',
        videos_location: '',
        maps_location: '',
        feature_btn_vr: false,
        feature_btn_email: true,
        fullsize_asset_location: '',
      },
    };
    let touchJson = {
      config: {
        images_location: '',
        videos_location: '',
      },
      images: [],
    };

    let oneParkJson = {
      config: {},
      galleries: {
        locations: {
          title: false,
          items: [],
        },
      },
    };

    // generate app json

    for (let i = 0; i < query.length; i++) {
      let obj = {
        [query[i].name]: [],
      };
      for (let j = 0; j < query[i].images.length; j++) {
        const childObj = {
          thumbnail:
            query[i].images[j].image[0]['thumbnail'].split('/')[
              query[i].images[j].image[0]['thumbnail'].split('/').length - 1
            ],
          data: query[i].images[j].image[0]['4k'].split('/')[
            query[i].images[j].image[0]['4k'].split('/').length - 1
          ],
          name: query[i].images[j].name,
        };
        obj[query[i].name].push(childObj);
      }
      appJson.config.project_name = query[0].project;
      appJson.config.project_location = `https://imerzaassets.s3.us-west-2.amazonaws.com/assets/${query[0].project}/`;
      appJson.config.images_location = `https://imerzaassets.s3.us-west-2.amazonaws.com/assets/${query[0].project}/images/`;
      appJson.config.asset_location = `https://imerzaassets.s3.us-west-2.amazonaws.com/assets/${query[0].project}/`;
      appJson = { ...appJson, ...obj };
    }

    // generate touch json

    for (let i = 0; i < query.length; i++) {
      const obj = {
        name: query[i].name,
        icon: '',
        images: [],
      };
      for (let j = 0; j < query[i].images.length; j++) {
        obj.images.push(
          `/${
            query[i].images[j].image[0]['4k'].split('/')[
              query[i].images[j].image[0]['4k'].split('/').length - 1
            ]
          }`,
        );
      }
      touchJson.config.images_location = `https://imerzaassets.s3.us-west-2.amazonaws.com/assets/${query[0].project}/images/`;
      touchJson.images.push(obj);
    }

    // generate one park json

    for (let i = 0; i < query.length; i++) {
      for (let j = 0; j < query[i].images.length; j++) {
        oneParkJson.galleries.locations.items.push({
          image:
            query[i].images[j].image[0]['4k'].split('/')[
              query[i].images[j].image[0]['4k'].split('/').length - 1
            ],
          thumbnail:
            query[i].images[j].image[0]['thumbnail'].split('/')[
              query[i].images[j].image[0]['thumbnail'].split('/').length - 1
            ],
          name: query[i].name,
        });
      }
    }
    return { appJson, touchJson, oneParkJson, query };
  }
}
