/// <reference types="node" />
import { S3Service } from "./s3/s3.service";
import { File, FilesDocument } from "src/schemas/files.schema";
import { Model, Types } from "mongoose";
import { ClientProxy } from "@nestjs/microservices";
import { RedisService } from "./redis/redis.service";
export declare class AppService {
    private s3Service;
    private redisService;
    private filesModel;
    private projectsService;
    constructor(s3Service: S3Service, redisService: RedisService, filesModel: Model<FilesDocument>, projectsService: ClientProxy);
    list(project: string): Promise<any>;
    getHello(): string;
    delete(project: string, id: string): Promise<{
        status: string;
    }>;
    create(project: string, name: string, key: string, tags: string[]): Promise<(Types.Subdocument<Types.ObjectId> & File) | {
        _id: Types.ObjectId;
        name: string;
        key: string;
        tags: string[];
        processing: boolean;
    }>;
    upload(project: string, id: string): Promise<{
        url: string;
    }>;
    uploadFinished(project: string, id: string): Promise<{
        status: string;
    }>;
    findById(project: string, id: string): Promise<File & {
        url: string;
    }>;
    getContents(project: string, id: string): Promise<import("stream").Readable>;
    update(project: string, id: string, name: string): Promise<Types.Subdocument<Types.ObjectId> & File>;
    processingFinished(project: string, id: string): Promise<{
        status: string;
    }>;
}
