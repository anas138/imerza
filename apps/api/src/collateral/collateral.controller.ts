import {
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  HttpException,
  Param,
  Res,
  Put,
  Delete,
} from '@nestjs/common';
import { Scopes } from '../scopes.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ColletralService } from './collateral.service';
import { uploadImage } from 'src/comon/upload.image';
import { Response } from 'express';
import { JoiValidationPipe } from 'src/comon/validation.pipe';
import { galleryValidationSchema } from 'src/comon/joi-validation-schema';
import { GalleryDto } from './dto/gallery.dto';
import { getImage } from 'src/comon/upload.image';
import { createReadStream } from 'fs';
import { shareImage } from 'src/service/mailService/mailService';
@Controller('collateral')
export class CollateralController {
  constructor(private readonly collService: ColletralService) {}

  @Get('/galleries/:id')
  @Scopes('collateral:read')
  @ApiBearerAuth('auth')
  getGalleries(@Param('id') id: string) {
    return this.collService.findAllGalleries(id);
  }

  @Post('/galleries')
  @Scopes('collateral:write')
  @ApiBearerAuth('auth')
  async addGallery(
    @Body(new JoiValidationPipe(galleryValidationSchema)) body: GalleryDto,
  ) {
    const galleryData = {
      ...body,
      images: [],
    };
    const ifExists = await this.collService.fingGallery(galleryData.name);
    if (!ifExists) {
      const gallery = await this.collService.createGallery(galleryData);
      if (gallery) {
        return {
          message: 'Gallery Added Successfully',
          data: gallery,
        };
      }
    } else {
      throw new HttpException('gallerirs already exists', 400);
    }
  }
  @Get('/images/:id')
  async getGalleryImages(@Param('id') id) {
    const res = await this.collService.fingGalleryById(id);
    if (res) {
      return res;
    } else {
      throw new HttpException('id is incorrect', 404);
    }
  }

  // @Post('/addimage')
  // @UseInterceptors(FilesInterceptor('image'))
  // async addImages(
  //   @Body(new JoiValidationPipe(galleryValidationSchema)) Body,
  //   @Param('id') id: string,
  //   @UploadedFiles() files: any,
  //   @Res() response: Response,
  // ) {
  //   const imageUrls = [];
  //   const galleryImages = {
  //     thumbnail: '',
  //     '2k': '',
  //     '4k': '',
  //     actual: '',
  //   };
  //   let sizes = {};
  //   let pixels = files[0].size / 24;
  //   const length = files.length;
  //   const gallery = await this.collService.fingGalleryById(id);
  //   if (gallery) {
  //     if (pixels <= 640) {
  //       sizes = {
  //         actual: Math.ceil(pixels),
  //       };
  //     }
  //     if (pixels > 1920 && pixels <= 3840) {
  //       sizes = {
  //         thumbnail: 640,
  //         actual: Math.ceil(pixels),
  //       };
  //     }
  //     if (pixels > 640 && pixels <= 1920) {
  //       sizes = {
  //         thumbnail: 640,
  //         '2k': 1920,
  //         actual: Math.ceil(pixels),
  //       };
  //     }
  //     if (pixels > 3840) {
  //       console.log('anas');
  //       sizes = {
  //         thumbnail: 640,
  //         '2k': 1920,
  //         '4k': 3840,
  //         actual: Math.ceil(pixels),
  //       };
  //     }

  //     console.log(files[0].size, 'sizes');
  //     console.log(sizes, 'si');
  //     for (let i in sizes) {
  //       const s = await sharp(files[0].buffer)
  //         .rotate()
  //         .resize(sizes[i])
  //         .toBuffer();

  //       uploadImage(s, i, async (data) => {
  //         if (data) {
  //           imageUrls.push(data);
  //           const images = await this.collService.updateImage(data, id);
  //           if (imageUrls.length === Object.values(sizes).length) {
  //             response.send({
  //               id: id,
  //               images: [...imageUrls],
  //               message: 'Image Added Successfully',
  //             });
  //           }
  //         }
  //       });
  //     }
  //   } else {
  //     throw new HttpException('id is incorrect', 404);
  //   }
  // }

  @Post('/sort')
  async updateSorted(@Body() body) {
    const arrayBody = Object.values(body);
    const response = await this.collService.updateSortedImages(body);
    return response;
  }
  @Get('/json/:project')
  async generateJson(@Param('project') project: string) {
    const json = await this.collService.generateJson(project);
    if (json) {
      return json;
    }
  }

  @Get('/Aws/image')
  async getAwsFile(@Res() res: Response) {
    const image = await getImage();
    //return image
    const file = await createReadStream(`${image}`);
    const mimeType = 'image/png'; // e.g., image/png
    res.send(`<img src="data:${mimeType};base64,${image}" />`);
  }

  @Post('/shareImage')
  async shareImage(@Body() body) {
    await shareImage(body.email, body.image);
  }
  @Put('/image')
  async removeImage(@Body() body) {
    const remove = await this.collService.RemoveMedia(body.id, body.imageId);
    if (remove) {
      return 'image remove successfully';
    }
  }
  @Delete('/:id')
  async deleteGallery(@Param() id) {
    const response = await this.collService.deleteGallery(id.id);
    return response;
  }
}
