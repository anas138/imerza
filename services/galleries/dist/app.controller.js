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
const collateral_schema_1 = require("./schemas/collateral.schema");
let AppController = class AppController {
    constructor(collateralModel) {
        this.collateralModel = collateralModel;
    }
    async list({ project }) {
        var _a, _b;
        const out = await this.collateralModel.aggregate([
            {
                $match: {
                    project: new mongoose_2.Types.ObjectId(project),
                },
            },
            {
                $unwind: '$galleries',
            },
            {
                $match: {
                    'galleries.deleted': { $ne: true },
                },
            },
            {
                $group: {
                    _id: '$_id',
                    galleries: { $push: '$galleries' },
                },
            },
        ]);
        return (_b = (_a = out[0]) === null || _a === void 0 ? void 0 : _a.galleries) !== null && _b !== void 0 ? _b : [];
    }
    async validate({ project, name }) {
        const { galleries } = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        for (const gallery of galleries) {
            if (gallery.name === name && !gallery.deleted) {
                return {
                    valid: false,
                };
            }
        }
        return {
            valid: true,
        };
    }
    async getGallery({ project, id }) {
        const { galleries } = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        return galleries.id(id);
    }
    async delete({ project, id }) {
        const galleriesDoc = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const gallery = galleriesDoc.galleries.id(id);
        if (gallery) {
            gallery.deleted = true;
        }
        await galleriesDoc.save();
        return {
            status: 'ok',
        };
    }
    async removeFromGalleries({ project, id }) {
        const galleriesDoc = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        for (const gallery of galleriesDoc.galleries) {
            gallery.items = gallery.items.filter((item) => item.toString() !== id);
        }
        await galleriesDoc.save();
        return {
            status: 'ok',
        };
    }
    async updateGalleries({ project, galleries }) {
        const galleriesDoc = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        galleriesDoc.galleries = galleries.map((gallery) => {
            const galleryItem = galleriesDoc.galleries.id(gallery._id);
            galleryItem.name = gallery.name;
            return galleryItem;
        });
        await galleriesDoc.save();
        return {
            status: 'ok',
        };
    }
    async update({ project, id, gallery }) {
        const galleriesDoc = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const galleryDoc = galleriesDoc.galleries.id(id);
        if (galleryDoc) {
            if (gallery.name) {
                galleryDoc.name = gallery.name;
            }
            if (gallery.items) {
                galleryDoc.items = gallery.items.map((item) => new mongoose_2.Types.ObjectId(item));
            }
            await galleriesDoc.save();
        }
        return {
            status: 'ok',
        };
    }
    async create({ project, name }) {
        const galleriesDoc = await this.collateralModel.findOne({
            project: new mongoose_2.Types.ObjectId(project),
        });
        const gallery = {
            _id: new mongoose_2.Types.ObjectId(),
            name,
            items: [],
            deleted: false,
        };
        galleriesDoc.galleries.push(gallery);
        await galleriesDoc.save();
        return gallery;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('listGalleries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "list", null);
__decorate([
    (0, microservices_1.MessagePattern)('validate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "validate", null);
__decorate([
    (0, microservices_1.MessagePattern)('getGallery'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getGallery", null);
__decorate([
    (0, microservices_1.MessagePattern)('delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeFromGalleries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "removeFromGalleries", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateGalleries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateGalleries", null);
__decorate([
    (0, microservices_1.MessagePattern)('update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, mongoose_1.InjectModel)(collateral_schema_1.Collateral.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map