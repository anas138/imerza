import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_DEFAULT_REGION'),
    });
  }

  async list() {
    return this.s3Client.send(
      new ListObjectsCommand({
        Bucket: 'imerzaassets',
        Prefix: '/assets/wst',
      }),
    );
  }
}
