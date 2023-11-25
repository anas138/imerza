import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollateralModule } from './collateral/collateral.module';
import { AllMediaModule } from './collateral/allMedia/allMedia.module';
import { AuthModule } from './collateral/auth/auth.module';
import { ScopesGuard } from './scopes.guard';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageCopiesModule } from './collateral/imageCopies/image.copies.module';
import { RolesModule } from './collateral/roles/roles.module';
import * as dotenv from 'dotenv';
const timeout = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    HttpModule,
    CollateralModule,
    AllMediaModule,
    AuthModule,
    RolesModule,
    ImageCopiesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ScopesGuard,
    // },
  ],
})
export class AppModule {}
