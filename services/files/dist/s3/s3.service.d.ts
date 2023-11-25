/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { File } from '../schemas/files.schema';
import { Readable } from 'node:stream';
export declare class S3Service {
    private configService;
    private s3Client;
    constructor(configService: ConfigService);
    list(): Promise<import("@aws-sdk/client-s3").ListObjectsCommandOutput>;
    upload(Key: string): Promise<string>;
    get(file: File): Promise<Readable>;
}
