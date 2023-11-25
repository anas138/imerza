import { Module } from '@nestjs/common';
import { OpenidController } from './openid.controller';

@Module({
  controllers: [OpenidController],
})
export class OpenidModule {}
