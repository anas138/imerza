import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { S3Service } from './s3/s3.service';

@Controller()
export class AppController {
  constructor(private s3Service: S3Service) {}

  @MessagePattern({ cmd: 'listGalleries' })
  listGalleries() {
    return this.s3Service.list();
  }
}
