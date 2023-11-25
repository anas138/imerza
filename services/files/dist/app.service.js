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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const s3_service_1 = require("./s3/s3.service");
const files_schema_1 = require("./schemas/files.schema");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const redis_service_1 = require("./redis/redis.service");
let AppService = class AppService {
    constructor(s3Service, redisService, filesModel, projectsService) {
        this.s3Service = s3Service;
        this.redisService = redisService;
        this.filesModel = filesModel;
        this.projectsService = projectsService;
    }
    async list(project) {
        const res = await this.filesModel.aggregate([
            {
                $match: {
                    project: new mongoose_2.Types.ObjectId(project),
                },
            },
            {
                $unwind: "$files",
            },
            {
                $match: {
                    "files.deleted": { $ne: true },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    prefix: { $first: "$prefix" },
                    files: { $push: "$files" },
                },
            },
        ]);
        return res[0];
    }
    getHello() {
        return "Hello World!";
    }
    async delete(project, id) {
        const fileDoc = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = fileDoc.files.id(id);
        file.deleted = true;
        await fileDoc.save();
        return {
            status: "ok",
        };
    }
    async create(project, name, key, tags) {
        const fileRecord = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const _id = new mongoose_2.Types.ObjectId();
        const newFile = {
            _id,
            name,
            key,
            tags,
            processing: true,
        };
        const existing = fileRecord.files.find((f) => f.key === key);
        if (existing) {
            existing.processing = true;
            existing.deleted = false;
            await fileRecord.save();
            return existing;
        }
        fileRecord.files.push(newFile);
        await fileRecord.save();
        return newFile;
    }
    async upload(project, id) {
        console.log(project, id);
        const proj = await (0, rxjs_1.firstValueFrom)(this.projectsService.send("find", {
            id: project,
        }));
        const files = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = files.files.id(id);
        file.processing = true;
        await files.save();
        return {
            url: await this.s3Service.upload(`assets/${proj.projectRoot}/${file.key}`),
        };
    }
    async uploadFinished(project, id) {
        const proj = await (0, rxjs_1.firstValueFrom)(this.projectsService.send("find", {
            id: project,
        }));
        const files = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = files.files.id(id);
        await this.redisService.addFileToQueue(project, file._id.toString(), `assets/${proj.projectRoot}/${file.key}`);
        return {
            status: "ok",
        };
    }
    async findById(project, id) {
        const { files } = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = files.id(id);
        return Object.assign({}, file.toObject());
    }
    async getContents(project, id) {
        const { files } = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = files.id(id);
        return this.s3Service.get(file);
    }
    async update(project, id, name) {
        const fileDoc = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = fileDoc.files.id(id);
        file.name = name;
        await fileDoc.save();
        return file;
    }
    async processingFinished(project, id) {
        console.log(project, id);
        const fileDoc = await this.filesModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const file = fileDoc.files.id(id);
        file.processing = false;
        await fileDoc.save();
        await this.redisService.processingFinished(project, id);
        return {
            status: "ok",
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(files_schema_1.Files.name)),
    __param(3, (0, common_1.Inject)("PROJECTS_SERVICE")),
    __metadata("design:paramtypes", [s3_service_1.S3Service,
        redis_service_1.RedisService,
        mongoose_2.Model,
        microservices_1.ClientProxy])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map