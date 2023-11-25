"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('AWS_DEFAULT_REGION'),
        });
    }
    async list() {
        return this.s3Client.send(new client_s3_1.ListObjectsCommand({
            Bucket: 'imerzaassets',
            Prefix: '/assets/wst',
        }));
    }
    async upload(Key) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: 'imerzaassets',
            Key,
            ACL: 'public-read',
        });
        return await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 3600 });
    }
    async get(file) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: 'imerzaassets',
            Key: file.key,
        });
        const res = await this.s3Client.send(command);
        return res.Body;
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map