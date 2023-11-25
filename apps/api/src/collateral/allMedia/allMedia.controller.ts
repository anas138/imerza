import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  Get,
  Put,
  Param,
  HttpException,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { uploadImage } from 'src/comon/upload.image';
import { AllMediaService } from './allMedia.service';
import { Response } from 'express';
import { JoiValidationPipe } from 'src/comon/validation.pipe';
import {
  galleryValidationSchema,
  mediaValidation,
} from 'src/comon/joi-validation-schema';
import * as sharp from 'sharp';
import { ColletralService } from '../collateral.service';
import { checkPixels } from 'src/comon/check.pixels';
import { ImageCopiesService } from '../imageCopies/image.copies.service';
import sizeOf from 'image-size';

@Controller('collateral/allmedia')
export class AllMediaController {
  constructor(
    private readonly allMediaService: AllMediaService,
    private collService: ColletralService,
    private imageCopiesService: ImageCopiesService,
  ) {}
  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async addImages(
    @Body(new JoiValidationPipe(mediaValidation)) Body,
    @Param('id') id: string,
    @UploadedFiles() files: any,
    @Res() response: Response,
  ) {
    const imageUrls = [];
    const dimension = sizeOf(files[0].buffer);
    let pixels = dimension.width;
    const projectRoot = Body.projectRoot;
    let imageSizes = {
      actual: '',
      thumbnail: '',
      '2k': '',
      '4k': '',
    };
    const user = Body.user;
    const sizes = checkPixels(pixels);
    for (let i in sizes) {
      const s = await sharp(files[0].buffer)
        .rotate()
        .resize(sizes[i])
        .toBuffer();
      const data = await uploadImage(s, i, projectRoot, async (data) => {});
      if (data) {
        imageUrls.push(data);
        imageSizes[i] = data;
      }
    }

    for (let i in imageSizes) {
      if (imageSizes[i] === '') {
        imageSizes[i] = imageSizes['actual'];
      }
    }
    await this.allMediaService.saveImages(
      imageSizes,
      id,
      user,
      projectRoot,
      files[0].originalname,
    );
    response.send({
      id: id,
      images: [...imageUrls],
      message: 'Image Added Successfully',
    });
  }
  @Get('/:id')
  async getAllImages(@Param('id') id: string) {
    const response = await this.allMediaService.getAllImages(id);
    if (response) {
      return response;
    }
  }
  // @Post('/sort')
  // async updateSorted(@Body() body){
  //   const arrayBody = Object.values(body)
  //   const response = await this.allMediaService.updateSortedImages(arrayBody)
  //   if(response){
  //       return "update successfully"
  //   }
  // }
  @Post('/media')
  async addMedia(@Body() body) {
    const arrayObj = Object.values(body);
    const response = await this.allMediaService.referenceImage(arrayObj);
    if (response) {
      return 'inserted successfully';
    }
  }
  @Put('/:id/:galId')
  async deleteMedia(@Param('id') id: string, @Param('galId') galId: string) {
    const response = await this.allMediaService.deleteMedia(id, galId);
    if (response) {
      return 'image delete successfully';
    }
  }
  @Put('/rename')
  async renameMedia(@Body() body) {
    const response = await this.allMediaService.renameMedia(body.id, body.name);
  }
}
