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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_service_1 = require("./app.service");
const file_reference_dto_1 = require("./file-reference.dto");
const files_schema_1 = require("./schemas/files.schema");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(appService, filesModel) {
        this.appService = appService;
        this.filesModel = filesModel;
    }
    async list(data) {
        const files = await this.appService.list(data.project);
        if (files)
            return files;
        throw new microservices_1.RpcException("Files not found for project");
    }
    async create({ project, name, key, tags, }) {
        return this.appService.create(project, name, key, tags);
    }
    async processingFinished({ project, id }) {
        return this.appService.processingFinished(project, id);
    }
    async findById(data) {
        return this.appService.findById(data.project, data.id);
    }
    async delete(data) {
        return this.appService.delete(data.project, data.id);
    }
    async update(data) {
        return this.appService.update(data.project, data.id, data.name);
    }
    async upload(data) {
        return this.appService.upload(data.project, data.id);
    }
    async uploadFinished(data) {
        return this.appService.uploadFinished(data.project, data.id);
    }
    sse() {
        return new rxjs_1.Observable((observer) => {
            setInterval(() => {
                observer.next({ data: { test: "Hello World" } });
            }, 1000);
            return () => {
                console.log("teardown");
            };
        });
    }
};
__decorate([
    (0, microservices_1.MessagePattern)("list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "list", null);
__decorate([
    (0, microservices_1.MessagePattern)("create"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)("processingFinished"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "processingFinished", null);
__decorate([
    (0, microservices_1.MessagePattern)("findById"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_reference_dto_1.FileReferenceDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findById", null);
__decorate([
    (0, microservices_1.MessagePattern)("delete"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_reference_dto_1.FileReferenceDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)("update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)("upload"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_reference_dto_1.FileReferenceDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "upload", null);
__decorate([
    (0, microservices_1.MessagePattern)("uploadFinished"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_reference_dto_1.FileReferenceDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFinished", null);
__decorate([
    (0, microservices_1.MessagePattern)("sse"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sse", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, mongoose_1.InjectModel)(files_schema_1.Files.name)),
    __metadata("design:paramtypes", [app_service_1.AppService,
        mongoose_2.Model])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map