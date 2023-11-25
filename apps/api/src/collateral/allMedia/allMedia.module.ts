import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AllMediaSchema, AllMedia } from './schema/allMedia.schema';
import { AllMediaController } from './allMedia.controller';
import { AllMediaService } from './allMedia.service';
import { CollateralModule } from '../collateral.module';
import { ImageCopiesModule } from '../imageCopies/image.copies.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AllMedia.name, schema: AllMediaSchema },
    ]),
    forwardRef(() => CollateralModule),
    ImageCopiesModule,
  ],
  controllers: [AllMediaController],
  providers: [AllMediaService],
  exports: [AllMediaService],
})
export class AllMediaModule {}
