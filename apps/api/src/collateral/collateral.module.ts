import { forwardRef, Module } from '@nestjs/common';
import { CollateralController } from './collateral.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ColletralService } from './collateral.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Gallery, GallerySchema } from './schema/galleries.schema';
import { AllMediaModule } from './allMedia/allMedia.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
    ClientsModule.register([
      {
        name: 'COLLATERAL_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 4001,
        },
      },
    ]),
    forwardRef(() => AllMediaModule),
  ],
  controllers: [CollateralController],
  providers: [ColletralService],
  exports: [ColletralService],
})
export class CollateralModule {}
